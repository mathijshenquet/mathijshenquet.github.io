#!/usr/bin/env python3
"""Build CV outputs (md, html, pdf) from cv.yaml + Jinja2 templates."""

import subprocess
import sys
import tempfile
from pathlib import Path

import yaml
from jinja2 import Environment, FileSystemLoader
from markupsafe import Markup

ROOT = Path(__file__).resolve().parent.parent
CV_DIR = ROOT / "cv"
DOCS_DIR = ROOT / "docs"
TEMPLATES_DIR = CV_DIR / "templates"
DATA_FILE = CV_DIR / "cv.yaml"


def load_data():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)

    # Pre-compute language_level strings for templates
    for lang in data.get("languages", []):
        lang["language_level"] = f"{lang['language']} ({lang['level']})"

    return data


def make_env(fmt):
    """Create a Jinja2 env with format-aware filters."""
    env = Environment(
        loader=FileSystemLoader(TEMPLATES_DIR),
        keep_trailing_newline=True,
        trim_blocks=True,
        lstrip_blocks=True,
    )

    def bold_author(name):
        surname = "Henquet"
        if name == surname:
            if fmt == "html":
                return Markup(f"<strong>{name}</strong>")
            elif fmt == "md":
                return f"**{name}**"
            elif fmt == "typst":
                return f"*{name}*"
        return name

    env.filters["bold_author"] = bold_author

    if fmt == "typst":
        def typst_escape(s):
            # Escape characters special in typst markup
            return str(s).replace("\\", "\\\\").replace("#", "\\#").replace("@", "\\@").replace("~", "\\~")
        env.filters["typ"] = typst_escape
    return env


def build_md(data):
    env = make_env("md")
    env.trim_blocks = False
    env.lstrip_blocks = False
    template = env.get_template("index.md.jinja")
    output = template.render(**data)
    out_path = DOCS_DIR / "index.md"
    out_path.write_text(output, encoding="utf-8")
    print(f"  -> {out_path}")


def build_html(data):
    env = make_env("html")
    template = env.get_template("index.html.jinja")
    output = template.render(**data)
    out_path = DOCS_DIR / "index.html"
    out_path.write_text(output, encoding="utf-8")
    print(f"  -> {out_path}")


def build_pdf(data):
    env = make_env("typst")
    env.trim_blocks = False
    env.lstrip_blocks = False
    template = env.get_template("onepager.typ.jinja")

    # Paths relative to the typst file location (cv/)
    photo_path = str(Path("../docs") / data["photo"]).replace("\\", "/")
    rendered = template.render(**data, photo_path=photo_path)

    # Write rendered typst file
    typ_path = CV_DIR / "onepager.typ"
    typ_path.write_text(rendered, encoding="utf-8")
    print(f"  -> {typ_path} (intermediate)")

    pdf_path = DOCS_DIR / "cv" / "mathijshenquet.pdf"
    pdf_path.parent.mkdir(parents=True, exist_ok=True)

    try:
        subprocess.run(
            ["typst", "compile", "--root", str(ROOT), str(typ_path), str(pdf_path)],
            check=True,
            capture_output=True,
            text=True,
        )
        print(f"  -> {pdf_path}")
    except FileNotFoundError:
        print("  !! typst not found — skipping PDF generation")
        print("     Install: https://github.com/typst/typst#installation")
    except subprocess.CalledProcessError as e:
        print(f"  !! typst compile failed:\n{e.stderr}")


def main():
    data = load_data()

    print("Building CV outputs...")

    print("Markdown:")
    build_md(data)

    print("HTML:")
    build_html(data)

    print("PDF (typst):")
    build_pdf(data)

    print("Done!")


if __name__ == "__main__":
    main()

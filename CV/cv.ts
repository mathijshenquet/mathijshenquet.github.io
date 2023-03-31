
import * as cv from "./cv.json";

let cv_root = "http://mathijshenquet.com/cv"
let _link = (target: string, item: string) => {
    let i = target.indexOf(':')

    if(i !== -1){
        let icon = target.slice(0, i);
        target = target.slice(i+1);
        item += ` \\textcolor{color2}{\\faIcon[regular]{${icon}}}`;
    }

    target = target.replace("%CV%", cv_root);
    return `\\href{${target}}{${item}}`;
}

function toLatex() {

    let lines: Array<string> = []


    function serialize(str: string): string {
        return str.replace("μ", "$\\mu$").replace("#", "\\#").replace("Latex", "\\LaTeX")
    }

    function line(...parts: Array<string | Array<string>>) {
        lines.push(parts.flatMap(part => part).map(serialize).join(""))
    }

    function cmd(name: string, opts: string | Array<string>, args: string | Array<string>) {
        if (typeof opts === "string") {
            opts = [opts];
        }
        if (typeof args === "string") {
            args = [args];
        }
        line(
            `\\${name}`,
            opts.map((part) => `[${part}]`),
            args.map((part) => `{${part}}`)
        )
    }


    function cventry(time: string, title: string, employee: string, localization: string, grade?: string, comment?: string) {
        time = time.replace(/ ?- ?/, " -- ").replace("present", "\\phantom{2020}")
        cmd("cventry", [], [time, title, localization ? `${employee}, ${localization}` : employee, "", grade ?? "", comment ?? ""])
    }


    function simple_entry(time: string, item: string, comment?: string) {
        time = time.replace(/ ?- ?/, "--").replace("present", "\\phantom{0}")
        cmd("cventry", [], [time, `\\normalfont ${item}`, "", "", "", comment ?? ""])
    }


    function cvitem(time: string, item: string, comment?: string) {
        cmd("cvitem", [], [time, item])
    }


    function section(name: string) {
        line();
        cmd("section", [], name)
    }

    cmd('name', [], cv.info.name.split(' '));

    cv.info.address[2] += " \\medskip"

    //cmd('address', [], cv.info.address);
    cmd('phone', "mobile", cv.info.phone);
    cmd('email', [], cv.info.email);
    cv.info.socials.forEach((social) => {
        let [platform, handle] = social.split(":");
        cmd('social', platform, handle);
    })

    lines.push('', '\\begin{document}', '\\makecvtitle', '\\vspace*{-3em}');

    section("Education");
    cv.education.forEach(({ time, item, grade }) => {
        let groups = /(?<title>.*) at (?<inst>.+?)(?:\, (?<loc>.*))?$/s.exec(item)?.groups ?? {};
        cventry(time, groups.title, groups.inst, groups.loc ?? "", grade ?? "")
    })


    section("Projects and awards")
    cv.projects.forEach((project) => {
        let {time, item, description} = project;
        if(project.link){
            item = _link(project.link, item)
        }
        simple_entry(time, item, description)
    })


    section("Experience");
    cv.experience.forEach((project) => {
        let {time, item, description} = project;
        if(project.link){
            item = _link(project.link, item)
        }
        simple_entry(time, item, description)
    })


    section("Language skills")
    cv.skills.language.forEach(({language, level}) => {
        lines.push('\\begin{minipage}[t]{0.33\\textwidth}')
        cmd("cvitem", [], [language, level]);
        lines.push('\\end{minipage}')
    });

    const _skills = (skills: Array<string>) => skills.map((x) => x.replace(/\((.*)\)/, "{\\small ($1)}")).join(", ");

    section("Technical skills")
    cvitem("Advanced", _skills(cv.skills.technical.advanced));
    cvitem("Intermediate", _skills(cv.skills.technical.intermediate))

    lines.push('', `\\end{document}`)

    console.log(lines.join("\n"));
}

toLatex()
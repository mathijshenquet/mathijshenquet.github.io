
import * as cv from "./cv.json";
import * as fs from "fs/promises";

let cv_root = "http://mathijshenquet.nl/cv"
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

const html_indent = "  ";

async function toLatex() {

    let latex: Array<string> = []
    let html: Array<string | number> = []


    function serialize_latex(str: string): string {
        return str.replace("μ", "$\\mu$").replace("#", "\\#").replace("Latex", "\\LaTeX")
    }

    function $(elem: string, props: string | {[key: string]: string}, ...content: Array<string | number>){
        if(typeof props === "object"){
            props = Object.entries(props).map(([key, value]) => `${key}="${value}`).join(" ");
        }

        let start = props ? `<${elem} ${props}>` : `<${elem}>`;

        return [start, 1, ...content, -1, `</${elem}>`];
    }
    
    function html_block(...lines: Array<string | number>){
        html.push(...lines, "");
    }

    function latex_line(...parts: Array<string | Array<string>>) {
        let content = parts.flatMap(part => part);
        latex.push(content.map(serialize_latex).join(""))
    }

    function latex_cmd(name: string, opts: string | Array<string>, args: string | Array<string>) {
        if (typeof opts === "string") {
            opts = [opts];
        }
        if (typeof args === "string") {
            args = [args];
        }
        latex_line(
            `\\${name}`,
            opts.map((part) => `[${part}]`),
            args.map((part) => `{${part}}`)
        )
    }


    function cventry(time: string, title: string, employee: string, localization: string, grade?: string, comment?: string) {
        time = time.replace(/ ?- ?/, " -- ").replace("present", "\\phantom{2020}")
        let location = localization ? `${employee}, ${localization}` : employee;
        latex_cmd("cventry", [], [time, title, location, "", grade ?? "", comment ?? ""])

        html_block(
            ...$('div', `class="entry"`, 
                ...$('div', `class="time"`, time), 
                ...$('div', `class="body"`, 
                    ...$('span', `class="title"`, title),
                    ...$('span', `class="location"`, location),
                    ...(grade ? $('span', `class="grade"`, grade) : []),
                    ...(comment ? $('p', `class="comment"`, comment) : []),
                ),
            )
        )
    }


    function simple_entry(time: string, item: string, grade: string = "", comment: string = "") {
        time = time.replace(/ ?- ?/, "--").replace("present", "\\phantom{0}")
        latex_cmd("cventry", [], [time, `\\normalfont ${item}`, "", "", grade ?? "", comment ?? ""])

        html_block(
            ...$('div', `class="entry"`, 
                ...$('div', `class="time"`, time), 
                ...$('div', `class="body"`, 
                    ...$('span', `class="item"`, item),
                    ...(comment ? $('p', `class="comment"`, comment) : []),
                ),
            )
        )
    }


    function cvitem(time: string, item: string, comment?: string) {
        latex_cmd("cvitem", [], [time, item])
    }


    function section(name: string) {
        latex_line();
        latex_cmd("section", [], name)

        let slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z-]/g, '');
        html.push(`<h2 id="${slug}">${name}</h1>`);
    }


    let html_info: Array<string> = [];
    function info(thing: string, icon: string | null, value: string){
        latex_cmd(thing, icon ? [icon] : [], value);

        value = `<i class="fas fa-${icon ?? thing}"></i> ${value}`;
        html_info.push(`<li class="info-${thing}">${value}</li>`);
    }

    let html_name = "";
    function name(name: string){
        html_name = name;
        latex_cmd('name', [], name.split(" "));
    }

    name(cv.info.name);

    //cv.info.address[2] += " \\medskip"
    //cmd('address', [], cv.info.address);

    info('phone', "mobile", cv.info.phone);
    info('email', null, cv.info.email);
    cv.info.socials.forEach((social) => {
        let [platform, handle] = social.split(":");
        info('social', platform, handle);
    })

    function header(){
        latex.push('', '\\begin{document}', '\\makecvtitle', '\\vspace*{-3em}');

        html.push(...$('header', {}, 
            `<h1>${html_name}</h1>`,
            ...$('ul', {"id": "info"}, ...html_info)
        ));
    }


    function _language({language, level}: {language: string, level: string}){
        latex.push('\\begin{minipage}[t]{0.33\\textwidth}')
        latex_cmd("cvitem", [], [language, level]);
        latex.push('\\end{minipage}')
    }

    const _skills = (skills: Array<string>) => skills.map((x) => x.replace(/\((.*)\)/, "{\\small ($1)}")).join(", ");

    function footer(){
        latex.push('', `\\end{document}`)
    }

    header()

    section("Technical skills")
    cvitem("Advanced", _skills(cv.skills.technical.advanced));
    cvitem("Intermediate", _skills(cv.skills.technical.intermediate))
    cvitem("Basic", "\\textit{\\small Many more...}")

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
        simple_entry(time, item, project.grade, description)
    })


    section("Experience");
    cv.experience.forEach((project) => {
        let {time, item, description} = project;
        if(project.link){
            item = _link(project.link, item)
        }
        simple_entry(time, item, "", description)
    })


    section("Language skills")
    cv.skills.language.forEach(_language);

    footer()

    let out = await fs.open(`out/cv.tex`, "w");

    out.write(await fs.readFile(`${__dirname}/preamble.tex`));
    for (let line of latex){
        await out.write(line);
        await out.write("\n");
    }
    await out.close();

    let html_lines: Array<string> = [];
    html.reduce<number>((indent, item) => {
        if(typeof item === 'number'){
            return indent + item;
        }else{
            html_lines.push(`${html_indent.repeat(indent)}${item}`);
            return indent;
        }
    }, 0);

    console.log(html_lines.join("\n"));
}

toLatex()
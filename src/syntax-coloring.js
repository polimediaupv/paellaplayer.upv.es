
export const json = (editor) => {
    let code = editor.textContent;
    code = code.replace(
        /(\"[a-z0-9\_\-\s\.]*\")(\s*\:)/gi,
        '<font class="key">$1</font>$2'
    );
    code = code.replace(
        /(\:\s*)(\"[a-z0-9\_\-\s\.\/\\\(\)\:]*\")/gi,
        '$1<font class="string">$2</font>'
    );
    code = code.replace(
        /(\[|\,)(\s*)(\"[a-z0-9\_\-\s\.]*\")/gi,
        '$1$2<font class="string">$3</font>'
    );
    code = code.replace(
        /(\:|\[|\,)(\s*)([0-9\-\.]+)/g,
        '$1$2<font class="number">$3</font>'
    );
    code = code.replace(
        /(\:|\[|\,)(\s*)([0-9\-\.]+)/g,
        '$1$2<font class="number">$3</font>'
    );
    code = code.replace(
        /(\{|\}|\[|\])/g,
        '<font class="brackets">$1</font>'
    );
    code = code.replace(
        /(\:|\,)/g,
        '<font class="separator">$1</font>'
    );
    code = code.replace(
        /(true)/gi,
        '<font class="boolean-true">$1</font>'
    );
    code = code.replace(
        /(false)/gi,
        '<font class="boolean-false">$1</font>'
    );
    editor.innerHTML = code;
}

export const css = (editor) => {
    let code = editor.textContent;

    code = code.replace(
        /([a-z\-0-9]+)(\s*\:)/gi,
        '<font class="css-property">$1</font>$2'
    )
 
    code = code.replace(
        /(\s*)(.*)(\s*\{)/gi,
        '$1<font class="css-query">$2</font>$3'
    )

    code = code.replace(
        /({|}|:|,)/g,
        `<font class="css-separator">$1</font>`
    )

    editor.innerHTML = `<font class="css-code">${code}</font>`;
}

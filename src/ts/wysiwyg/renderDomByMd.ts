import {enableToolbar} from "../toolbar/enableToolbar";
import {removeCurrentToolbar} from "../toolbar/removeCurrentToolbar";
import {afterRenderEvent} from "./afterRenderEvent";
import {processCodeData} from "./processCodeData";
import {precessCodeRender} from "./processCodeRender";

export const renderDomByMd = (vditor: IVditor, md: string) => {
    const allToolbar = ["headings", "bold", "italic", "strike", "line", "quote",
        "list", "ordered-list", "check", "code", "inline-code", "upload", "link", "table", "record"];
    removeCurrentToolbar(vditor.toolbar.elements, allToolbar);
    enableToolbar(vditor.toolbar.elements, allToolbar);

    const editorElement = vditor.wysiwyg.element;
    editorElement.innerHTML = vditor.lute.Md2VditorDOM(md);
    processCodeData(editorElement);

    editorElement.querySelectorAll(".vditor-wysiwyg__block").forEach((blockElement: HTMLElement) => {
        precessCodeRender(blockElement, vditor);
        blockElement.firstElementChild.setAttribute("style", "display:none");
    });

    afterRenderEvent(vditor);
};

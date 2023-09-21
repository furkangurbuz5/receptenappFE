class Ingredient {
    constructor(data) {
        this.data = data;
        this.DOMnode = this.Create();
    }
    //-------------------------------------------------
    Create() {
        let ui = document.createElement("DIV");
        ui.classList.add("ingredient"); // css class voor de vormgeving
        ui.setAttribute("draggable", true); // hierdoor worden objecten op scherm draggable
        ui.setAttribute("title", this.MaakSpiekbriefje());
        ui.append(this.data.naam);

        ui.ondragstart = (event) => this.DragStart(event);
        ui.ondragenter = (event) => this.DragEnter(event);
        ui.ondragover = (event) => this.DragOver(event);
        ui.ondragleave = (event) => this.DragLeave(event);
        ui.ondragend = (event) => this.DragEnd(event);

        //let panel_details = document.createElement("DIV");
        //panel_details.classList.add("panel_details");
        //panel_details.append(this.MaakSpiekbriefje());
        //ui.append(panel_details);
        return ui;
    }
    //-------------------------------------------------
    MaakSpiekbriefje() {
        // we noteren alles in this.data op een 'spiekbriefje'
        // zodat we alle data ook op de client kunnen zien!
        let lines = [];
        for (let property in this.data) {
            lines.push(property + " = " + this.data[property]);
        }
        return lines.join("\n");
    }
    //-------------------------------------------------
    GetDOM() {
        return this.DOMnode;
    }
    //-------------------------------------------------
    DragStart(event) {
        console.log("dragstart");
        this.DOMnode.style.filter = "yellow";
        draggeditem = this;
    }
    //-------------------------------------------------
    DragOver(event) {
        console.log("dragover");
        //this.DOMnode.style.backgroundColor = "orange";
        event.preventDefault(); // crucial! without this line the dropping won't work!!
    }
    //-------------------------------------------------
    DragEnter(event) {
        console.log("dragenter");
        this.DOMnode.style.backgroundColor = "lightorange"; 
        // dit ZIE je NIET omdat het dragover event
        // METEEN na de dragenter wordt afgevuurd door de browser
    }
    //-------------------------------------------------
    DragLeave(event) {
        console.log("dragleave");
        this.DOMnode.style.backgroundColor = "";
    }
    //-------------------------------------------------
    DragEnd(event) {
        console.log("dragend");
        this.DOMnode.style.backgroundColor = "";
        draggeditem = null;
    }
    //-------------------------------------------------
}

class Recept {
    constructor(data) {
        this.data = data;
        this.DOMnode = this.Create();
    }
    //-------------------------------------------------
    Create() {
        let ui = document.createElement("DIV");
        ui.classList.add("recept");
        ui.setAttribute("title", this.MaakSpiekbriefje());

        ui.ondrop = (event) => {
            this.Drop(event);
        };
        ui.ondragover = (event) => {
            ui.style.backgroundColor = "lightgreen";
            event.preventDefault(); // this is crucial! ommit it and drop won't work
        };
        ui.ondragleave = (event) => {
            ui.style.backgroundColor = "";
        };

        ui.append(this.data.naam);
        // voeg de ingrdienten toe
        for(let i = 0; i < this.data.ingredient_i.length; i++) {
            ui.append(new Ingredient(this.data.ingredient_i[i]).GetDOM())
        }

        return ui;
    }
    //-------------------------------------------------
    GetDOM() {
        return this.DOMnode;
    }
    //-------------------------------------------------
    async Drop(event) {
        this.DOMnode.style.backgroundColor = "";
        this.DOMnode.append(new Ingredient(draggeditem.data).GetDOM());

        let url = "http://localhost:8083/associeer_ingredient_recept/"+draggeditem.data.id  +"/"+this.data.id;
        //alert(url);
        const response = await fetch(url);
        console.log(response)
    }
    //-------------------------------------------------
    MaakSpiekbriefje() {
        // we noteren alles in this.data op een 'spiekbriefje'
        // zodat we alle data ook op de client kunnen zien!
        let spiekbriefje = "";
        for (let property in this.data) {
            spiekbriefje += property + " = " + this.data[property] + "\n";
        }
        return spiekbriefje;
    }
    //-------------------------------------------------
}

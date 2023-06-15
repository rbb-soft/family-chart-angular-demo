import { Component, OnInit } from '@angular/core';
import * as f3 from "../../../assets/lib/family-chart";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  constructor() { }
  tree:f3.Datum[]=[];

  ngOnInit(): void {
    this.tree=  localStorage.getItem("tree") === null ? this.data() : JSON.parse(localStorage.getItem("tree") || "");
   this.setTree();
  }
  
  setTree(){
    const cont = document.querySelector("#FamilyChart");
    const card_dim = {w:220,h:70,text_x:75,text_y:15,img_w:60,img_h:60,img_x:5,img_y:5};
    const card_display = this.cardDisplay();
    const card_edit = this.cardEditParams();
    /***** */
    const cardEditForm = (props:any) => {
      const postSubmit = props.postSubmit;
      props.postSubmit = (ps_props:any) => {
        postSubmit(ps_props);
        localStorage.setItem("tree",JSON.stringify(this.tree))
      };
      this.Form({ ...props, card_edit, card_display });
    }
    /***** */
    const store = f3.createStore({ // return object
      data: this.tree,
      node_separation: 250,
      level_separation: 150
    });
    const view = f3.d3AnimationView({ // return object
      store,
      cont: cont ,
      card_edit: this.cardEditParams()
    });
    
    const Card = f3.elements.Card({ // return a function
      store,
      svg: view.svg, // object
      card_dim: card_dim,
      card_display: this.cardDisplay(),
      card_edit: this.cardEditParams(),
      mini_tree: true,
      link_break: false,
      _callBack:cardEditForm,
      addRelative: f3.handlers.AddRelative({ store, cont, card_dim, cardEditForm})
    });
    
  view.setCard(Card); // function
  store.setOnUpdate((props:any) => view.update(props || {}));
  store.update.tree({initial: true}); 
  
  }
  /******************************************************************************************************* */
  Form(args:any){
    const _style ="padding-top:50px;position: fixed;overflow: auto;width: 350px;height: 100%;top: 0;right: 0;bottom: 0;background-color: rgba(255,255,255,1);color: white;z-index: 2;cursor: pointer;"
    const f3div   = document.querySelector("#FamilyChart");
    let editDiv= document.createElement("div");
    editDiv.setAttribute("style", _style);
    f3div?.append(editDiv);

    let form = document.createElement("form");
    args.card_edit.map( (d:any) => {
      let input = document.createElement("input");
      input.setAttribute("type",d.type);
      input.setAttribute("name",d.key);
      input.setAttribute("placeholder",d.placeholder);
      let value = args.datum.data[d.key] === undefined ? "" : args.datum.data[d.key];
      input.setAttribute("value",value);
      input.setAttribute("style","clear:both");
      form.appendChild(input);
    });
    editDiv.appendChild(form);

    let submit = document.createElement("button");
    submit.setAttribute("style","margin-left:25%; padding:15px;border-radius:15");
    submit.setAttribute("type","submit");
    submit.textContent="save";
    form.appendChild(submit);
    
    form.addEventListener("submit", (e:Event) => {
      e.preventDefault();
      const formElement = e.target as HTMLFormElement;
      const form_data = new FormData(formElement);
      form_data.forEach((v, k) => args.datum.data[k] = v)
      args.postSubmit()
      editDiv.remove();
    });

    const closeBtn = document.createElement("button");
    closeBtn.setAttribute("style", "float:right");
    closeBtn.textContent="X";
    form?.prepend(closeBtn);
    closeBtn.addEventListener("click",()=>{editDiv.remove()});

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("style","margin-left:15px;padding:15px;border-radius:15");
    deleteBtn.textContent="delete";
    form.appendChild(deleteBtn);
    deleteBtn.addEventListener("click",()=>{
      args.postSubmit({delete:true})
    });
    

   
    
    
  }
  /******************************************************************************************************* */
  cardDisplay() {
    
    const d1 = (d:any) => `${d.data["first name"] || ""} ${d.data["last name"] || ""}`; //
    const d2 = (d:any) => `${d.data["birthday"]}`;
    return [d1, d2];
  }
  cardEditParams() {
    return [
      { type: "text", placeholder: "nombre", key: "first name" },
      { type: "text", placeholder: "apellido", key: "last name" },
      { data_type:"date",type: "text", placeholder: "nacimiento", key: "birthday" },
      { data_type:"date",type: "text", placeholder: "fallecimiento", key: "dead" },
      {  type: "textarea", placeholder: "resumen corto descriptivo 2048 caracteres maximo", key: "short_bio" },
      { type: "text", placeholder: "foto", key: "avatar" }
    ];
  }
  /******************************************************************************************************* */
  data() {
    return [
      {
        "id": "0",
        "rels": {
          "father": "d10190e9-3a2f-4ecc-b663-6cfda87c4b26",
          "mother": "3880d51a-28bf-44a9-8546-b572a27aa7d6",
          "spouses": [
            "a836d151-28fc-4f05-ba3f-d4f7e1c60bbe"
          ],
          "children": [
            "62997598-0786-47a3-901d-80298e33a137"
          ]
        },
        "data": {
          "first name": "Richard",
          "last name": "",
          "birthday": "1977",
          "avatar": "",
          "gender": "M"
        }
      },
      {
        "id": "d10190e9-3a2f-4ecc-b663-6cfda87c4b26",
        "data": {
          "gender": "M",
          "first name": "Nelson",
          "last name": "",
          "birthday": "1954",
          "avatar": ""
        },
        "rels": {
          "children": [
            "0"
          ],
          "spouses": [
            "3880d51a-28bf-44a9-8546-b572a27aa7d6"
          ]
        }
      },
      {
        "id": "3880d51a-28bf-44a9-8546-b572a27aa7d6",
        "data": {
          "gender": "F",
          "first name": "Lourdes",
          "last name": "",
          "birthday": "1956",
          "avatar": ""
        },
        "rels": {
          "spouses": [
            "d10190e9-3a2f-4ecc-b663-6cfda87c4b26"
          ],
          "children": [
            "0"
          ]
        }
      },
      {
        "id": "a836d151-28fc-4f05-ba3f-d4f7e1c60bbe",
        "data": {
          "gender": "F",
          "first name": "Carina",
          "last name": "",
          "birthday": "1977",
          "avatar": ""
        },
        "rels": {
          "spouses": [
            "0"
          ],
          "children": [
            "62997598-0786-47a3-901d-80298e33a137"
          ]
        }
      },
      {
        "id": "62997598-0786-47a3-901d-80298e33a137",
        "data": {
          "gender": "M",
          "first name": "Brandon",
          "last name": "",
          "birthday": "2015",
          "avatar": ""
        },
        "rels": {
          "mother": "a836d151-28fc-4f05-ba3f-d4f7e1c60bbe",
          "father": "0"
        }
      }
      ]
  }
}

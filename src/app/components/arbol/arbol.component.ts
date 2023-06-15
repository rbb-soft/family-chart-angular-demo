import { Component, OnInit } from '@angular/core';
import * as f3 from '../../../assets/lib/family-chart'

@Component({
  selector: 'app-arbol',
  templateUrl: './arbol.component.html',
  styleUrls: ['./arbol.component.css']
})
export class ArbolComponent implements OnInit {
  tree:f3.Datum[]=[];
  constructor() { }

  ngOnInit(): void {
   this.tree=  localStorage.getItem("tree") === null ? this.data() : JSON.parse(localStorage.getItem("tree") || "");
   this.setTree();
  }
  
  setTree(){ 
    const store = f3.createStore({ // return object
      data: this.tree,
      node_separation: 250,
      level_separation: 150
    });
    const view = f3.d3AnimationView({ // return object
      store,
      cont: document.querySelector("#FamilyChart")
    })
    const Card = f3.elements.Card({ // return a function
      store,
      svg: view.svg, // object
      card_dim: {w:220,h:70,text_x:75,text_y:15,img_w:60,img_h:60,img_x:5,img_y:5},
      card_display:[d => `${d.data['first name'] || ''} ${d.data['last name'] || ''}`,d => `${d.data['birthday'] || ''}`],
      mini_tree: true,
      link_break: false
    });
  view.setCard(Card); // function
  store.setOnUpdate((props:any) => view.update(props || {}));
  store.update.tree({initial: true}); 
  
  
  }
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

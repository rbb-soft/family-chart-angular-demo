/************************************************************************* */
declare interface Datum {
  id: string;
  rels: {
    father: string;
    mother: string;
    spouses: string[];
    children: string[];
  };
  data: {
    firstName: string;
    lastName: string;
    birthday: string;
    avatar: string;
    gender: string;
  },
  main?: boolean
}
/************************************************************************* */
declare enum RelType{
    "father",
    "mother",
    "spouse",
    "daughter",
    "son"
}
/************************************************************************* */
interface  CardDim {
    w:number,
    h:number,
    text_x:number,
    text_y:number,
    img_w:number,
    img_h:number,
    img_x:number,
    img_y:number
}
/************************************************************************* */
type CardDisplayFn = (d: any) => string;
type CardDisplay = Array<CardDisplayFn>;
/************************************************************************* */
interface FormField {
  type: string;
  placeholder: string;
  key: string;
  data_type?: string;
}
type CardEditParams = Array<FormField>;
/************************************************************************* */

/************************************************************************* */
export function CalculateTree({ data_stash, main_id, is_vertical, node_separation, level_separation }: {
    data_stash: any;
    main_id?: any;
    is_vertical?: boolean;
    node_separation?: number;
    level_separation?: number;
}): {
    data: Datum[];
    data_stash: any;
    dim: {
        width: any;
        height: any;
        x_off: number;
        y_off: number;
    };
};
export function createStore(initial_state: object): {
    state: {
        data: Datum,
        node_separation: number, 
        level_separation: number,
        tree :any 
    };
    update: {
        tree: (props: any) => any;
        mainId: (main_id: any) => any;
        data: (data: any) => any;
    };
    getData: () => Datum;
    getTree: () => any;
    setOnUpdate: (f: any) => any;
    methods: {};
};
export function d3AnimationView(store: object): {
    setCard:(props:any)  => void;
	update: (props: any) => void;
	svg: (props: any) => SVGAElement;
	
};
export var handlers: Readonly<{
    __proto__: any;
    moveToAddToAdded: (datum: Datum, data_stash: any) => any;
    removeToAdd: (datum: Datum, data_stash: any) => boolean;
    deletePerson: (datum: Datum, data_stash: any) => {
        success: boolean;
        error: string;
    } | {
        success: boolean;
        error?: undefined;
    };
    manualZoom: ({ amount, svg, transition_time }: {
        amount: any;
        svg: any;
        transition_time?: number;
    }) => void;
    isAllRelativeDisplayed: (d: any, data: any) => boolean;
    AddRelative:(obj:object) => any;
    generateUUID: () => string;
    cardChangeMain: (store: object, { card, d }: {
        card: any;
        d: any;
    }) => boolean;
    cardEdit: (store: object, { card, d }: {
        card: any;
        d: any;
    }) => void;
    cardAddRelative: (store: object, { card, d, scale }: {
        card: any;
        d: any;
        scale: any;
    }) => void;
    cardShowHideRels: (store: object, { card, d }: {
        card: any;
        d: any;
    }) => void;
    handleRelsOfNewDatum: ({ datum, data_stash, rel_type, rel_datum }: {
        datum: Datum;
        data_stash: any;
        rel_type: RelType;
        rel_datum: Datum;
    }) => void;
    createNewPerson: ({ data, rels }: {
        data: any;
        rels: any;
    }) => {
        id: string;
        data: any;
        rels: any;
    };
    createNewPersonWithGenderFromRel: ({ data, rel_type, rel_datum }: {
        data: any;
        rel_type: RelType;
        rel_datum: Datum;
    }) => {
        id: string;
        data: any;
        rels: any;
    };
    addNewPerson: ({ data_stash, datum }: {
        data_stash: any;
        datum: Datum;
    }) => void;
    createTreeDataWithMainNode: ({ data, version }: {
        data: any;
        version: any;
    }) => {
        data: {
            id: string;
            data: any;
            rels: any;
        }[];
        version: any;
    };
    addNewPersonAndHandleRels: ({ datum, data_stash, rel_type, rel_datum }: {
        datum: Datum;
        data_stash: any;
        rel_type: RelType;
        rel_datum: Datum;
    }) => void;
    checkIfRelativesConnectedWithoutPerson: (datum: Datum, data_stash: any) => boolean;
}>;
export var elements: Readonly<{
    __proto__: any;
    CardBody: ({ d, card_dim, card_display }: {
        d: any;
        card_dim: CardDim;
        card_display: CardDisplay;
    }) => {
        template: string;
    };
    CardBodyAddNew: ({ d, card_dim, show_edit, label }: {
        d: any;
        card_dim: CardDim;
        show_edit: any;
        label: any;
    }) => {
        template: string;
    };
    CardBodyOutline: ({ d, card_dim, is_new }: {
        d: any;
        card_dim: CardDim;
        is_new: any;
    }) => {
        template: string;
    };
    PencilIcon: ({ d, card_dim, x, y }: {
        d: any;
        card_dim: CardDim;
        x: any;
        y: any;
    }) => {
        template: string;
    };
    HideIcon: ({ d, card_dim }: {
        d: any;
        card_dim: CardDim;
    }) => {
        template: string;
    };
    MiniTree: ({ d, card_dim }: {
        d: any;
        card_dim: CardDim;
    }) => {
        template: string;
    };
    PlusIcon: ({ d, card_dim, x, y }: {
        d: any;
        card_dim: CardDim;
        x: any;
        y: any;
    }) => {
        template: string;
    };
    LinkBreakIcon: ({ x, y, rt, closed }: {
        x: any;
        y: any;
        rt: any;
        closed: any;
    }) => {
        template: string;
    };
    LinkBreakIconWrapper: ({ d, card_dim }: {
        d: any;
        card_dim: CardDim;
    }) => string;
    CardImage: ({ d, image, card_dim, maleIcon, femaleIcon }: {
        d: any;
        image: any;
        card_dim: CardDim;
        maleIcon: any;
        femaleIcon: any;
    }) => {
        template: string;
    };
	Card: ({ store,svg,card_dim,card_display,card_edit,mini_tree,link_break }: {
      store : object,
      svg: object,
      card_dim: CardDim,
      card_display: CardDisplay,
      card_edit?:CardEditParams,
      _callBack?:Function,
      addRelative?:Function,
      mini_tree: boolean,
      link_break: boolean
    }) => any;
}>;

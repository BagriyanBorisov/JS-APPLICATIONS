const section = document.getElementById('home-view');
section.querySelector('a').addEventListener('click', onClick);

let ctx = null;
export function showHome(context){
   ctx = context;
   context.showSection(section);
}

function onClick(e){
   e.preventDefault();
   ctx.goTo("/catalog")
}
export function createCSSLoader(){
  const wrapper = document.createElement('div');
  wrapper.classList.add('loading-wrapper')
  const loader = document.createElement('div');
  loader.classList.add('lds-ring')
  wrapper.appendChild(loader);
  for(let i = 0; i < 4; i++){
    const div = document.createElement('div');
    loader.appendChild(div);
  }
  return wrapper;
}
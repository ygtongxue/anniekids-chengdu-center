/* 安妮花成都区域中心 · 共享交互 */
(function(){
  var header = document.getElementById('siteHeader');
  var nav = document.getElementById('mainNav');
  var toggle = document.getElementById('navToggle');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); });
    });
  }
  function onScroll(){
    if(header){ header.classList.toggle('scrolled', window.scrollY > 8); }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();

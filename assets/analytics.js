/* GA4：PV計測＋フォームへのボタンクリック計測（HP・LP共通）
   測定IDは GA_ID を差し替える。未設定（G-XXXX）のあいだは何も送らない。 */
(function(){
  var GA_ID = 'G-XXXXXXXXXX';
  if (GA_ID.indexOf('XXXX') > -1) return;
  var s = document.createElement('script');
  s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', GA_ID);

  var FORMS = {
    '1FAIpQLSe_AEtY58nITSL4fysFP0we7L3E5vW6d-9pd56apk4U8M7JZw': '経営診断',
    '1FAIpQLScr0qs4FmNU3PDeHApabsbFEbv1v2HXzuLQebowi0GBQObMBw': '集客診断',
    '1GCyr77BBxJ8v6hau07Pu1oZGEM-dN-XFCLn2GmGxDAE': '価値診断',
    '1Wadv1XWsuoTryicn_GsCDWkYl4f9sPdVw8x3bEHQk1c': 'お問い合わせ'
  };
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href*="docs.google.com/forms"]');
    if (!a) return;
    var form = 'その他';
    for (var k in FORMS) if (a.href.indexOf(k) > -1) { form = FORMS[k]; break; }
    var sec = a.closest('section,header,footer,.sticky');
    gtag('event', 'form_click', {
      form_name: form,
      button_text: (a.textContent || '').trim().slice(0, 40),
      button_place: sec ? (sec.id || sec.className.split(' ')[0] || sec.tagName.toLowerCase()) : 'other',
      transport_type: 'beacon'
    });
  });
})();

// Copy button on code blocks: copies the code and shows "Copied" for 1.5s.
document.querySelectorAll('.code__copy').forEach(function (b) {
  b.addEventListener('click', function () {
    var pre = b.closest('.code').querySelector('pre');
    if (!pre || !navigator.clipboard) return;
    navigator.clipboard.writeText(pre.innerText).then(function () {
      b.textContent = 'Copied';
      setTimeout(function () { b.textContent = 'Copy'; }, 1500);
    });
  });
});

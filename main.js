'use strict';

function copyText (text) {
  const x = window.scrollX, y = window.scrollY;
  const input = document.createElement('textarea');
  // input.setAttribute('style', 'visibility: hidden;');
  input.value = text;
  document.body.appendChild(input);
  input.focus();
  input.select();
  document.execCommand('copy');
  window.scrollTo(x, y);
  document.body.removeChild(input);
}

function addCopyAllButton () {
  const node = document.querySelector('.text-gray.table-list-header-toggle');
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.setAttribute('class', 'btn-link rgh-copy-all-selected pl-3');
  button.innerText = 'Copy all';
  button.onclick = () => {
    var items = [];
    document.querySelectorAll('.js-issues-list-check:checked').forEach(node => {
      const div = node.parentElement.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
      const anchor = div.childNodes[1];
      const link = `https://github.com${anchor.getAttribute('href')}`;
      const title = anchor.innerText;
      items.push(link);
    });
    copyText(items.join('\n'));
  }

  node.appendChild(button);
}

function augmentUI () {
  addCopyAllButton();
}

$(function () {
  // var observedNode = document.querySelector('body');
  // var config = { attributes: true, childList: true, subtree: true };
  // var observer = new MutationObserver((mutationsList, observer) => {
  //   augmentUI();
  // });
  // observer.observe(observedNode, config);

  augmentUI();
});

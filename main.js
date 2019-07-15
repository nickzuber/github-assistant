'use strict';

const error = (msg) => {
  console.error(`[GitHub Assistant] ${msg}`);
}

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
  try {
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
  } catch (err) {
    error('Error occurred while trying to add `Copy all` button.');
  }
}

function addStyleRule (selector, rule) {
  document.styleSheets[0].insertRule(`${selector} ${rule}`, 0);
}

function addCopyAll (retry = 200, attempts = 0) {
  if (attempts >= 10) {
    error('Unable to add `Copy all` button.');
  }
  if (document.querySelector('.text-gray.table-list-header-toggle')) {
    addCopyAllButton();
  } else {
    setTimeout(() => {
      addCopyAll(retry * 2, ++attempts);
    }, retry);
  }
}

function adjustSpaceDots (retry = 200, attempts = 0) {
  if (attempts >= 10) {
    error('Unable to adjust the space-dots.');
  }
  if (document.querySelector('.rgh-space-char')) {
    addStyleRule('.rgh-space-char', `{
      opacity: 0.4;
    }`);
    addStyleRule('.rgh-ws-char', `{
      opacity: 0.4;
    }`);
  } else {
    setTimeout(() => {
      adjustSpaceDots(retry * 2, ++attempts);
    }, retry);
  }
}

$(function () {
  // var observedNode = document.querySelector('body');
  // var config = { attributes: true, childList: true, subtree: true };
  // var observer = new MutationObserver((mutationsList, observer) => {
  //   addCopyAll();
  // });
  // observer.observe(observedNode, config);

  addCopyAll();
  adjustSpaceDots();
});

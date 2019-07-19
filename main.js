'use strict';

const prefix = {
  text: '%c(%cGitHub Assistant%c)',
  styles: [
    `
      color: black;
      font-weight: 400;
    `,
    `
      color: #111;
      font-weight: 400;
    `,
    `
      color: black;
      font-weight: 400;
    `
  ]
};

const info = (msg) => {
  console.log(`${prefix.text} %cinfo %c${msg}`, ...prefix.styles, 'color:#2196f3;font-weight:bold;', 'color:#bbb;font-weight:400;')
}

const error = (msg) => {
  console.log(`${prefix.text} %cfail %c${msg}`, ...prefix.styles, 'color:#e91e1e;font-weight:bold;', 'color:#bbb;font-weight:400;')
}

const success = (msg) => {
  console.log(`${prefix.text} %cpass %c${msg}`, ...prefix.styles, 'color:#27b768;font-weight:bold;', 'color:#bbb;font-weight:400;')
}

const warn = (msg) => {
  console.log(`${prefix.text} %cwarn %c${msg}`, ...prefix.styles, 'color:#ffc107;font-weight:bold;', 'color:#bbb;font-weight:400;')
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
    success('Added the Copy All button');
    node.appendChild(button);
  } catch (err) {
    error('Error while trying to add the Copy All button');
  }
}

function addStyleRule (selector, rule) {
  document.styleSheets[0].insertRule(`${selector} ${rule}`, 0);
}

function addCopyAll (retry = 500, attempts = 0) {
  if (attempts === 0) {
    info('Adding the Copy All button (will try for 5s)');
  } else if (attempts >= 10) {
    warn('Could not add the Copy All button');
    return;
  }
  if (document.querySelector('.text-gray.table-list-header-toggle')) {
    addCopyAllButton();
  } else {
    setTimeout(() => {
      addCopyAll(retry, ++attempts);
    }, retry);
  }
}

function adjustSpaceDots (retry = 500, attempts = 0) {
  if (attempts === 0) {
    info('Adjusting the space-dots (will try for 5s)');
  } else if (attempts >= 10) {
    warn('Could not adjust the space-dots');
    return;
  }
  if (document.querySelector('.rgh-space-char')) {
    success('Adjusted the space-dots');
    addStyleRule('.rgh-space-char', `{
      opacity: 0.4;
    }`);
    addStyleRule('.rgh-ws-char', `{
      opacity: 0.4;
    }`);
  } else {
    setTimeout(() => {
      adjustSpaceDots(retry, ++attempts);
    }, retry);
  }
}

$(function () {
  info('Starting up');

  // var observedNode = document.querySelector('body');
  // var config = { childList: true, subtree: true };
  // var observer = new MutationObserver((mutationsList, observer) => {
  addCopyAll();
  adjustSpaceDots();
  // });
  // observer.observe(observedNode, config);
});

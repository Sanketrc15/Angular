import { Component, OnInit} from '@angular/core';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    // tslint:disable-next-line: no-unused-expression
    new Mentionify(
      document.getElementById('textarea'),
      document.getElementById('menu'),
      // tslint:disable-next-line: no-use-before-declare
      resolveFn,
      // tslint:disable-next-line: no-use-before-declare
      replaceFn,
      // tslint:disable-next-line: no-use-before-declare
      menuItemFn
    );
  }
  // tslint:disable-next-line: member-ordering
  properties = [
    'direction',
    'boxSizing',
    'width',
    'height',
    'overflowX',
    'overflowY',

    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'borderStyle',

    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',

    'fontStyle',
    'fontVariant',
    'fontWeight',
    'fontStretch',
    'fontSize',
    'fontSizeAdjust',
    'lineHeight',
    'fontFamily',

    'textAlign',
    'textTransform',
    'textIndent',
    'textDecoration',

    'letterSpacing',
    'wordSpacing',

    'tabSize',
    'MozTabSize',
  ];

   // tslint:disable-next-line: member-ordering
   isFirefox = typeof window !== 'undefined' && window['mozInnerScreenX'] != null;

  /**
   * @param {HTMLTextAreaElement} element
   * @param {number} position
   */
  getCaretCoordinates(element, position) {
    // // console.log('posiiton' + position);
    const div = document.createElement('div');
    document.body.appendChild(div);

    const style = div.style;
    const computed = getComputedStyle(element);

    style.whiteSpace = 'pre-wrap';
    style.wordWrap = 'break-word';
    style.position = 'absolute';
    style.visibility = 'hidden';

    this.properties.forEach(prop => {
      style[prop] = computed[prop];
    });

    if (this.isFirefox) {
      // tslint:disable-next-line: radix
      if (element.scrollHeight > parseInt(computed.height)) {
        style.overflowY = 'scroll';
      }
    } else {
      style.overflow = 'hidden';
    }

    div.textContent = element.value.substring(0, position);

    const span = document.createElement('span');
    span.textContent = element.value.substring(position) || '.';
    div.appendChild(span);
    // // console.log('span ' + span.offsetHeight);

    const coordinates = {
      // tslint:disable-next-line: radix
      top: span.offsetTop + parseInt(computed['borderTopWidth']),
      // tslint:disable-next-line: radix
      left: span.offsetLeft + parseInt(computed['borderLeftWidth']),
      // height: parseInt(computed['lineHeight'])
      height: span.offsetHeight
    };

    // // console.log('coord top ' + coordinates.top + 'coord left ' + coordinates.left);

    // div.remove();

    return coordinates;
  }
}





class Mentionify {
  // tslint:disable-next-line: no-shadowed-variable
  constructor(ref, menuRef, resolveFn, replaceFn, menuItemFn) {
    this.ref = ref;
    this.menuRef = menuRef;
    this.resolveFn = resolveFn;
    this.replaceFn = replaceFn;
    this.menuItemFn = menuItemFn;
    this.options = [];

    this.makeOptions = this.makeOptions.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.onClick = this.onClick.bind(this);

    this.ref.addEventListener('input', this.onInput);
    this.ref.addEventListener('keydown', this.onKeyDown);
    this.ref.addEventListener('click', this.onClick);
    this.closeMenu();
  }
  ref: any;
  menuRef: any;
  resolveFn: any;
  replaceFn: any;
  menuItemFn: any;
  options: any[];
  left: any;
  top: any;
  triggerIdx: any;
  active: number;
  query: any;
  clicked = false;

  async makeOptions(query) {
    const options = await this.resolveFn(query);
    if (options.lenght !== 0) {
      this.options = options;
      this.renderMenu();
    } else {
      this.closeMenu();
    }
  }

  closeMenu() {
    setTimeout(() => {
      this.options = [];
      this.left = undefined;
      this.top = undefined;
      this.triggerIdx = undefined;
      this.renderMenu();
    }, 0);
  }

  onClick() {
    this.clicked = true;
    this.closeMenu();
  }

  selectItem(active) {
    return () => {
      const preMention = this.ref.value.substr(0, this.triggerIdx);
      const option = this.options[active];
      const mention = this.replaceFn(option, this.ref.value[this.triggerIdx]);
      const postMention = this.ref.value.substr(this.ref.selectionStart);
      const newValue = `${preMention}${mention}${postMention}`;
      newValue.replace(this.query, '');
      this.ref.value = newValue;
      const caretPosition = this.ref.value.length - postMention.length;
      this.ref.setSelectionRange(caretPosition, caretPosition);
      this.closeMenu();
      this.ref.focus();
    };
  }
  onInput(ev) {
    let positionIndex = this.ref.selectionStart;
    // console.log(positionIndex + 'ref selection start');
    const textBeforeCaret = this.ref.value.slice(0, positionIndex);
    const tokens = textBeforeCaret.split(/\s/);
    const preLastToken = tokens[tokens.length - 2];
    const lastToken = tokens[tokens.length - 1];
    const triggerIdx = textBeforeCaret.endsWith(lastToken)
      ? textBeforeCaret.length - lastToken.length
      : -1;
    // console.log(triggerIdx);
    let triggerIdx2: number;
    let maybeTrigger2;
    let keystrokeTriggered;
    const maybeTrigger = textBeforeCaret[triggerIdx];
    if (preLastToken && !this.clicked) {
      triggerIdx2 = textBeforeCaret.length - lastToken.length - preLastToken.length - 1;
      maybeTrigger2 = textBeforeCaret[triggerIdx2];
      keystrokeTriggered = maybeTrigger === '@' || maybeTrigger2 === '@';
      // console.log('keystroke' + maybeTrigger2);
    } else {
      keystrokeTriggered = maybeTrigger === '@';
    }
    // const keystrokeTriggered = maybeTrigger === '@';

    if (!keystrokeTriggered) {
      // console.log('close');
      this.closeMenu();
      return;
    }
    // console.log(triggerIdx + 1);
    // console.log('may be trigger 2 ' + maybeTrigger2);
    if (maybeTrigger2 === '@' && maybeTrigger === '@') {
      this.triggerIdx = triggerIdx;
      this.query = textBeforeCaret.slice(triggerIdx + 1);
    } else if (maybeTrigger2 === '@') {
      this.triggerIdx = triggerIdx2;
      this.query = textBeforeCaret.slice(triggerIdx2 + 1);
      // console.log('query index ' + this.query.substring(this.query.indexOf('@') + 1));
      // console.log('query ' + this.query + 'triggerindx 2 ' + triggerIdx2 + 'triggeridx1 ' + triggerIdx);
      // this.query = this.query.substring(this.query.indexOf('@') + 1);
    } else {
      this.triggerIdx = triggerIdx;
      this.query = textBeforeCaret.slice(triggerIdx + 1);
      this.clicked = false;
    }
    this.makeOptions(this.query);

    const mc = new AppComponent();
    positionIndex = this.triggerIdx;
    const coords = mc.getCaretCoordinates(this.ref, positionIndex);
    const { top, left } = this.ref.getBoundingClientRect();
    // console.log('top ' + (coords.top + top - this.ref.scrollTop) + 'left ' + (coords.left + left + this.ref.scrollLeft));
    // console.log('coords height  ' + coords.height);
    setTimeout(() => {
      this.active = 0;
      this.left = window.scrollX  + coords.left + left + this.ref.scrollLeft;
      this.top = window.scrollY +  coords.top + top + 21 - this.ref.scrollTop;
      // this.triggerIdx = triggerIdx
      this.renderMenu();
    }, 0);
  }

  onKeyDown(ev) {
    let keyCaught = false;
    if (this.triggerIdx !== undefined) {
      switch (ev.key) {
        case 'ArrowDown':
          this.active = Math.min(this.active + 1, this.options.length - 1);
          this.renderMenu();
          keyCaught = true;
          break;
        case 'ArrowUp':
          this.active = Math.max(this.active - 1, 0);
          this.renderMenu();
          keyCaught = true;
          break;
        case 'Enter':
        case 'Tab':
          this.selectItem(this.active)();
          keyCaught = true;
          break;
      }
    }

    if (keyCaught) {
      ev.preventDefault();
    }
  }

  renderMenu() {
    if (this.top === undefined) {
      this.menuRef.hidden = true;
      return;
    }
    // console.log('menuref left ' + this.left + 'menuref top ' + this.top);
    this.menuRef.style.left = this.left + 'px';
    this.menuRef.style.top = this.top + 'px';
    this.menuRef.innerHTML = '';

    this.options.forEach((option, idx) => {
      this.menuRef.appendChild(this.menuItemFn(
        option,
        this.selectItem(idx),
        this.active === idx));
    });

    this.menuRef.hidden = false;
  }
}

const users = [
  { username: 'john doe'},
  { username: 'john kamlesh' },
  { username: 'sankit patil' },
  { username: 'aditya nair' },
  { username: 'ankit doe' },
  { username: 'jane do' }
];

const resolveFn = prefix => prefix === ''
  ? users
  : users.filter(user => user.username.includes(prefix));

const replaceFn = (user, trigger) =>`${trigger}${user.username}`;

const menuItemFn = (user, setItem, selected) => {
  const div = document.createElement('div');
  div.setAttribute('role', 'option');
  div.className = 'menu';
  if (selected) {
    // div.classList.add('alert-secondary');
    div.setAttribute('aria-selected', '');
    div.classList.add('selected');
    div.style.backgroundColor = 'rgba(220, 220, 221, 0.692)';

  }
  div.textContent =  user.username;
  div.onclick = setItem;
  // div.onkeypress = setItem;
  return div;
};
import clsx from 'clsx';

class Dropdown {
  constructor({ parent, items, className, transformFn = value => value }) {
    const dropdown = document.createElement('div');
    const dropdownButton = document.createElement('button');
    const dropdownItems = document.createElement('ul');
    const buttonIcon = document.createElement('i');

    this.dropdown = dropdown;
    this.button = dropdownButton;
    this.items = dropdownItems;
    this._value = items[0];
    this._disabled = false;
    this.isExpanded = false;
    this.transformFn = transformFn;

    dropdown.className = clsx('dropdown flex items-center justify-between relative', className);
    dropdown.dataset.value = transformFn(items[0]);

    dropdownButton.type = 'button';
    dropdownButton.className = clsx(
      'dropdown-button flex items-center justify-between w-full',
      'focus:outline-none border border-blue-500 rounded-md',
      'px-2 pb-1 pt-0.5 capitalize'
    );
    dropdownButton.addEventListener('click', this.expandToggler.bind(this));
    buttonIcon.className = 'fa-solid fa-chevron-down fa-2xs transition-all duration-300 mt-1';

    dropdownItems.className = clsx(
      'dropdown-items absolute top-[120%] left-0 z-50',
      'w-full bg-white border border-gray-300 shadow-lg',
      'opacity-0 pointer-events-none transition-opacity',
      'duration-300 rounded-md overflow-hidden capitalize'
    );

    dropdownItems.addEventListener('click', e => {
      const { target } = e;

      if (dropdownItems.contains(target)) {
        const { value } = target.dataset;
        this.value = value;
      }
    });

    items.forEach(item => {
      const dropdownItem = document.createElement('li');
      dropdownItem.textContent = item;
      dropdownItem.dataset.value = item;
      dropdownItem.className = clsx(
        'dropdown-item cursor-pointer hover:bg-gray-200',
        'border-b last:border-b-0 border-gray-300 px-2 pb-0.5'
      );
      dropdownItems.appendChild(dropdownItem);
    });

    dropdownButton.append(items[0], buttonIcon);
    dropdown.append(dropdownButton, dropdownItems);
    document.querySelector(parent).appendChild(dropdown);

    window.addEventListener('click', e => {
      const { target } = e;
      if (!dropdown.contains(target)) if (this.isExpanded) this.expandToggler();
    });
  }

  get value() {
    return this.transformFn(this._value);
  }

  set value(newValue) {
    this._value = newValue;
    this.dropdown.dataset.value = this.transformFn(newValue);
    this.button.firstChild.textContent = newValue;
    this.expandToggler(false);
  }

  get disabled() {
    return this._disabled;
  }

  set disabled(state) {
    this._disabled = state;

    if (state) {
      if (this.isExpanded) this.expandToggler();
      this.button.classList.add('cursor-not-allowed', 'text-gray-500/50');
      return;
    }

    this.button.classList.remove('cursor-not-allowed', 'text-gray-500/50');
  }

  expandToggler() {
    if (this.disabled) return;

    const buttonIcon = this.button.lastChild;
    this.isExpanded = !this.isExpanded;

    if (this.isExpanded) {
      this.items.classList.remove('opacity-0', 'pointer-events-none');
      buttonIcon.classList.add('-rotate-180');
    } else {
      this.items.classList.add('opacity-0', 'pointer-events-none');
      buttonIcon.classList.remove('-rotate-180');
    }
  }
}

export default Dropdown;

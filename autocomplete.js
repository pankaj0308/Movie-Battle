const autocomplete = ({
  label,
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  root.innerHTML = `
  <label><b>Search for ${label}</b></label>
  <input class='input'/>
  <div class='dropdown'>
    <div class='dropdown-menu'>
    <div class = 'dropdown-content results'>
    </div>
    </div>
  </div>
`;

  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  const onInput = async (event) => {
    const items = await fetchData(event.target.value);
    if (!items[0]) {
      dropdown.classList.remove("is-active");
      return;
    } else {
      resultsWrapper.innerHTML = "";
      dropdown.classList.add("is-active");
      for (let item of items) {
        const option = document.createElement("a");

        option.classList.add("dropdown-item");

        option.innerHTML = renderOption(item);
        option.addEventListener("click", () => {
          dropdown.classList.remove("is-active");
          input.value = inputValue(item);

          onOptionSelect(item);
        });

        resultsWrapper.appendChild(option);
      }
    }
  };

  //debouncing onInput and detecting the typed query
  input.addEventListener("input", debounce(onInput, 500));

  // remove already showed input list
  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};

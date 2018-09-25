$(function () {

  const state = {
    toDoList: [],
  };

  const render = function () {
    $('#content').empty();
    runToDoQuery();
  }

  const renderToDo = function (outputElement, toDoList, index) {
    const output = $(outputElement);

    const toDoListElement = $('<div>').addClass('toDo');

    const label = $('<label>').addClass('check-marker');
    const checkbox = $('<input type="checkbox">')
      .attr('checked', toDoList.completed)
      .addClass('completed')
      .attr('data-index', index);


    label.append(checkbox);
    label.append('<i class="fas fa-check-square checked">');
    label.append('<i class="far fa-square unchecked">');

    toDoListElement.append(
      label,

      $('<span>').text(toDoList.thingToDo).addClass('textDisplay'),

      $('<button>')
        .addClass('delete')
        .attr('data-index', index)
        .append('<i>').addClass('fas fa-times')
    );

    output.append(toDoListElement);
  }

  const renderToDos = function (outputElement, toDoList) {
    const output = $(outputElement);
    output.empty();
    toDoList.forEach((todo, index) => renderToDo(outputElement, todo, index));
  }

  const runToDoQuery = function () {

    $.ajax({ url: "/api/todoarray", method: "GET" })
      .then(function (toDoList) {
        state.toDoList = toDoList
        renderToDos('#content', toDoList);
      });
  }


  $('.submit').on('click', function (event) {
    event.preventDefault();

    const newToDo = {
      thingToDo: $('#toDoInput').val().trim(),
      completed: false,
    };

    for (let key in newToDo) {
      if (newToDo[key] === '') {
        alert('Please Enter Something To Do!');
        return;
      }
    }

    $.ajax({ url: '/api/todoarray', method: 'POST', data: newToDo }).then(
      function (data) {

        // If our POST request was successfully processed, proceed on
        if (data.success) {

          console.log('data', data)
          $('#content').val('');
          $('#content').focus();
        }
      })

    $.ajax({
      url: '/api/todoarray',
      method: 'POST',
      data: newToDo
    }).then(
      function (data) {
        if (data.success) {

          console.log('data', data)
          $('#toDoInput').val('');
          $('#toDoInput').focus();

          render();
        } else {

          alert('There was a problem with your submission. Please check your entry and try again.');
        }
      });

  })

  $('body').on('click', '.completed', function (event) {
    const thisIndex = $(this).attr('data-index');
    const completed = event.target.checked; 

  
    const toDoUpdate = state.toDoList[Number(thisIndex)];

    // update the competed field
    toDoUpdate.completed = completed;

    // Make the PUT request
    $.ajax({
        url: `/api/todoarray/${thisIndex}`,
        method: 'PUT',
        data: toDoUpdate
      })
      .then(function (data) {

        // If our PUT request was successfully processed, proceed on
        if (data.success) {
          render();
        } else {

          alert('There was a problem with your submission. Please check your entry and try again.');
        }


      });
  })


  $('body').on('click', '.delete', function (event) {
    const thisIndex = $(this).attr('data-index');

    console.log(state.toDoList[Number(thisIndex)])

    // Make the DELETE request
    $.ajax({
        url: `/api/todoarray/${thisIndex}`,
        method: 'DELETE'
      })
      .then(function (data) {

        // If our DELETE request was successfully processed, proceed on
        if (data.success) {
          render();
        } else {

          alert('There was a problem with your submission. Please check your entry and try again.');
        }

      });
  });


  render();
});


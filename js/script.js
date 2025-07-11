// Ambil elemen
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoDate = document.getElementById("todo-date");
const filterBtn = document.getElementById("filter-btn");
const showAllBtn = document.getElementById("show-all-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");
const todoList = document.getElementById("todo-list");

let todos = [];

// Tambah todo saat submit
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!todoInput.checkValidity() || !todoDate.checkValidity()) {
    todoInput.reportValidity();
    todoDate.reportValidity();
    return;
  }

  const task = todoInput.value.trim();
  const date = todoDate.value;

  todos.push({ task, date, status: "Pending" });

  todoInput.value = "";
  todoDate.value = "";

  renderTodos(todos);
});

// Tampilkan daftar tugas
function renderTodos(data) {
  todoList.innerHTML = "";

  if (data.length === 0) {
    todoList.innerHTML = `
      <tr>
        <td colspan="4" class="text-center py-2">No task found</td>
      </tr>`;
    return;
  }

  data.forEach((todo, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border px-4 py-2">${todo.task}</td>
      <td class="border px-4 py-2">${todo.date}</td>
      <td class="border px-4 py-2">${todo.status}</td>
      <td class="border px-4 py-2">
        <button onclick="deleteTodo(${index})" class="bg-red-500 text-white px-2 py-1 rounded text-sm">Delete</button>
      </td>
    `;
    todoList.appendChild(row);
  });
}

// Hapus satu tugas
function deleteTodo(index) {
  if (todos.length === 0) {
    alert("Tabel kosong. Tambahkan task terlebih dahulu.");
    return;
  }

  const yakin = confirm("Yakin ingin menghapus task ini?");
  if (yakin) {
    todos.splice(index, 1);
    renderTodos(todos);
  }
}

// Hapus semua tugas
deleteAllBtn.addEventListener("click", () => {
  if (todos.length === 0) {
    alert("Tabel kosong. Tambahkan task terlebih dahulu.");
    return;
  }

  const yakin = confirm("Yakin ingin menghapus semua task?");
  if (yakin) {
    todos = [];
    renderTodos(todos);
  }
});

// Filter berdasarkan tanggal
filterBtn.addEventListener("click", () => {
  const filterDate = todoDate.value;

  if (!filterDate) {
    alert("Pilih tanggal terlebih dahulu untuk filter.");
    return;
  }

  const filtered = todos.filter(todo => todo.date === filterDate);

  if (filtered.length === 0) {
    alert("Tidak ditemukan task dengan tanggal tersebut.");
  }

  renderTodos(filtered);
});

// Tampilkan semua tugas kembali
showAllBtn.addEventListener("click", () => {
  renderTodos(todos);
});

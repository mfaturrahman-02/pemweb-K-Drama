const dramaListEl = document.getElementById('drama-list');
const dramaForm = document.getElementById('drama-form');
const formTitle = document.getElementById('form-title');
const dramaIdInput = document.getElementById('drama-id');
const titleInput = document.getElementById('title');
const episodesInput = document.getElementById('episodes');
const descriptionInput = document.getElementById('description');
const quoteInput = document.getElementById('quote');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');

let currentDramas = [];

async function fetchDramas() {
  try {
    const response = await fetch('/api/dramas');
    currentDramas = await response.json();
    renderDramas(currentDramas);
  } catch (error) {
    console.error('Gagal mengambil data drama:', error);
  }
}

function renderDramas(dramas) {
  dramaListEl.innerHTML = '';

  if (dramas.length === 0) {
    dramaListEl.innerHTML = '<p>Belum ada data drama. Silakan tambahkan melalui form.</p>';
    return;
  }

  dramas.forEach((drama) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div>
        <div class="card-header">
          <h3 class="card-title">${drama.title}</h3>
          <span class="badge">${drama.episodes} Episode</span>
        </div>
        <p class="card-desc">${drama.description}</p>
        <blockquote class="card-quote">"${drama.quote}"</blockquote>
      </div>
      <div class="card-actions">
        <button class="btn btn-edit" data-id="${drama.id}">Edit</button>
        <button class="btn btn-delete" data-id="${drama.id}">Hapus</button>
      </div>
    `;
    dramaListEl.appendChild(card);
  });
}

// 2. POST & 3. PUT: Menambahkan data baru atau mengubah data melalui form
dramaForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = dramaIdInput.value;
  const payload = {
    title: titleInput.value.trim(),
    episodes: Number(episodesInput.value),
    description: descriptionInput.value.trim(),
    quote: quoteInput.value.trim()
  };

  try {
    if (id) {
      // PUT: Mengubah data melalui fitur Edit
      await fetch(`/api/dramas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      // POST: Menambahkan data melalui form
      await fetch('/api/dramas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    resetForm();
    await fetchDramas();
  } catch (error) {
    console.error('Gagal menyimpan data:', error);
  }
});

// Event Delegation untuk tombol Edit dan tombol Hapus
dramaListEl.addEventListener('click', async (e) => {
  const target = e.target;
  const idAttr = target.getAttribute('data-id');
  if (!idAttr) return;

  const id = Number(idAttr);

  // Mengisi form saat tombol Edit diklik
  if (target.classList.contains('btn-edit')) {
    const drama = currentDramas.find(d => d.id === id);
    if (!drama) return;

    dramaIdInput.value = String(drama.id);
    titleInput.value = drama.title;
    episodesInput.value = String(drama.episodes);
    descriptionInput.value = drama.description;
    quoteInput.value = drama.quote;

    formTitle.textContent = 'Edit Data Drama';
    submitBtn.textContent = 'Update Drama';
    cancelBtn.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 4. DELETE: Menghapus data melalui tombol Hapus
  if (target.classList.contains('btn-delete')) {
    const confirmDelete = confirm('Apakah Anda yakin ingin menghapus drama ini?');
    if (!confirmDelete) return;

    try {
      await fetch(`/api/dramas/${id}`, {
        method: 'DELETE'
      });
      await fetchDramas();
    } catch (error) {
      console.error('Gagal menghapus data:', error);
    }
  }
});

function resetForm() {
  dramaIdInput.value = '';
  dramaForm.reset();
  formTitle.textContent = 'Tambah Drama Baru';
  submitBtn.textContent = 'Simpan Drama';
  cancelBtn.classList.add('hidden');
}

cancelBtn.addEventListener('click', resetForm);

// Panggil fungsi GET saat halaman pertama kali dibuka
fetchDramas();

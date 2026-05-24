

document.addEventListener('DOMContentLoaded', () => {

  // =========================
  // ELEMENT
  // =========================

  const filterButtons = document.querySelectorAll('.artifact-filter')
  const cards = document.querySelectorAll('.artifact-card')

  const prevBtn = document.getElementById('prev-btn')
  const nextBtn = document.getElementById('next-btn')
  const pageIndicator = document.getElementById('page-indicator')

  // =========================
  // CONFIG
  // =========================

  let currentFilter = 'all'
  let currentPage = 1

  const cardsPerPage = 3

  // =========================
  // GET FILTERED CARD
  // =========================

  function getFilteredCards() {

    return Array.from(cards).filter(card => {

      return (
        currentFilter === 'all' ||
        card.dataset.category === currentFilter
      )

    })

  }

  // =========================
  // RENDER CARD
  // =========================

  function renderCards() {

    const filteredCards = getFilteredCards()

    const totalPages = Math.ceil(
      filteredCards.length / cardsPerPage
    )

    // hide all
    cards.forEach(card => {
      card.style.display = 'none'
    })

    // start end
    const start =
      (currentPage - 1) * cardsPerPage

    const end =
      start + cardsPerPage

    // show current page
    filteredCards
      .slice(start, end)
      .forEach(card => {

        card.style.display = 'block'

      })

    // page text
    pageIndicator.innerText =
      `Page ${currentPage} of ${totalPages || 1}`

    // disable button
    prevBtn.disabled = currentPage === 1
    nextBtn.disabled = currentPage === totalPages

    prevBtn.classList.toggle(
      'opacity-50',
      currentPage === 1
    )

    nextBtn.classList.toggle(
      'opacity-50',
      currentPage === totalPages
    )

  }

  // =========================
  // FILTER CLICK
  // =========================

  filterButtons.forEach(button => {

    button.addEventListener('click', () => {

      currentFilter =
        button.dataset.filter

      currentPage = 1

      // reset button
      filterButtons.forEach(btn => {

        btn.classList.remove(
          'bg-blue-600',
          'text-white'
        )

        btn.classList.add(
          'bg-white'
        )

      })

      // active button
      button.classList.remove('bg-white')

      button.classList.add(
        'bg-blue-600',
        'text-white'
      )

      renderCards()

    })

  })

  // =========================
  // NEXT BUTTON
  // =========================

  nextBtn.addEventListener('click', () => {

    const filteredCards = getFilteredCards()

    const totalPages = Math.ceil(
      filteredCards.length / cardsPerPage
    )

    if(currentPage < totalPages) {

      currentPage++

      renderCards()

    }

  })

  // =========================
  // PREV BUTTON
  // =========================

  prevBtn.addEventListener('click', () => {

    if(currentPage > 1) {

      currentPage--

      renderCards()

    }

  })

  // =========================
  // INITIAL
  // =========================

  renderCards()

})


document.addEventListener('DOMContentLoaded', () => {

  const modal =
    document.getElementById('artifact-modal')

  const modalContent =
    document.getElementById('modal-content')

  const closeModal =
    document.getElementById('close-modal')

  // =========================
  // PREVIEW BUTTON
  // =========================

  document
    .querySelectorAll('.preview-btn')
    .forEach(button => {

      button.addEventListener('click', () => {

        const card =
          button.closest('.artifact-card')

        const type =
          card.dataset.type

        const src =
          card.dataset.src

        modal.classList.remove('hidden')
        modal.classList.add('flex')

        // =====================
        // IMAGE
        // =====================

        if(type === 'image') {

          modalContent.innerHTML = `
            <img
              src="${src}"
              class="w-full h-full object-cover"
            >
          `
        }

        // =====================
        // PDF
        // =====================

        if(type === 'pdf') {

          modalContent.innerHTML = `
            <iframe
              src="${src}"
              class="w-full h-full bg-white"
              frameborder="0"
            ></iframe>
          `
        }

        // =====================
        // YOUTUBE
        // =====================

        if(type === 'video') {

          modalContent.innerHTML = `
            <iframe
              src="${src}"
              class="w-full h-full"
              frameborder="0"
              allowfullscreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          `
        }

      })

    })

  // =========================
  // CLOSE MODAL
  // =========================

  closeModal.addEventListener('click', () => {

    modal.classList.add('hidden')
    modal.classList.remove('flex')

    modalContent.innerHTML = ''

  })

  // =========================
  // CLICK OUTSIDE
  // =========================

  modal.addEventListener('click', (e) => {

    if(e.target === modal) {

      modal.classList.add('hidden')
      modal.classList.remove('flex')

      modalContent.innerHTML = ''

    }

  })

})

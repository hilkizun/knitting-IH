window.onload = () => {
    const likeBtns = document.querySelectorAll('.like-btn')
  
    likeBtns.forEach(likeBtn => {
      const productId = likeBtn.value;
  
      const iconNode = likeBtn.querySelector('.bi')
  
      likeBtn.onclick = () => {
        axios.post(`/products/${productId}/like`)
          .then((response) => {
            if (response.status === 201) {
              iconNode.classList.remove('bi-heart');
              iconNode.classList.add('bi-heart-fill');
            } else if (response.status === 204) {
              iconNode.classList.add('bi-heart');
              iconNode.classList.remove('bi-heart-fill');
            }
          })
          .catch((err) => {
            console.error(err)
          })
      }
    })
  }
  

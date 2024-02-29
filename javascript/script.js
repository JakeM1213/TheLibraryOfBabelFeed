document.addEventListener('DOMContentLoaded', function() {
    const feed = document.querySelector('.feed');

    window.addEventListener('scroll', () => {
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
            const newPost = feed.lastElementChild.cloneNode(true);
            feed.appendChild(newPost);
        }
    });

    function applyGlitchEffect() {
        document.body.classList.add('glitch-active');
        setTimeout(() => {
            document.body.classList.remove('glitch-active');
        }, 1000); 
    }

    feed.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG' && e.target.src.endsWith('.gif')) {
            applyGlitchEffect();
        }
    });

    document.querySelectorAll('.comment-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const commentInput = this.querySelector('.comment-input');
            const commentText = commentInput.value.trim();

            if (commentText) {
                const newComment = document.createElement('p');
                newComment.textContent = commentText;
                newComment.classList.add('comment');

                const commentsContainer = this.nextElementSibling;
                commentsContainer.appendChild(newComment);

                commentInput.value = '';
            }
        });
    });

    document.querySelectorAll('.reaction').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });

    function scrambleText(text) {
        return text.split('').sort(() => Math.random() - 0.5).join('');
    }

    document.querySelectorAll('.post p').forEach(element => {
        element.addEventListener('click', function() {
            const originalText = this.textContent;
            const scrambledText = scrambleText(originalText);
            this.textContent = scrambledText;
        });
    });
});

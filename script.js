// 서울국제도서전 2025 꼭 봐야할 책 리스트
const sibfBooks = [
    {
        imgSrc: "https://contents.kyobobook.co.kr/sih/fit-in/200x0/pdt/9791193078563.jpg",
        href: "https://product.kyobobook.co.kr/detail/S000216717476",
        text: "토막 난 우주를 안고서"
    },
    {
        imgSrc: "https://contents.kyobobook.co.kr/sih/fit-in/200x0/pdt/9791167372864.jpg",
        href: "https://product.kyobobook.co.kr/detail/S000201621499",
        text: "구의 증명(리커버판)"
    },
    {
        imgSrc: "https://contents.kyobobook.co.kr/sih/fit-in/200x0/pdt/9791170525929.jpg",
        href: "https://product.kyobobook.co.kr/detail/S000216810838",
        text: "죽은 자에게 입이 있다"
    },
    {
        imgSrc: "https://contents.kyobobook.co.kr/sih/fit-in/200x0/pdt/9791170403265.jpg",
        href: "https://product.kyobobook.co.kr/detail/S000216664067",
        text: "아이들의 집"
    },
    {
        imgSrc: "https://contents.kyobobook.co.kr/sih/fit-in/200x0/pdt/9791171251360.jpg",
        href: "https://product.kyobobook.co.kr/detail/S000210428432",
        text: "붉은 궁"
    },
    {
        imgSrc: "https://contents.kyobobook.co.kr/sih/fit-in/200x0/pdt/9791130666808.jpg",
        href: "https://product.kyobobook.co.kr/detail/S000216818173",
        text: "밤새들의 도시"
    },
    {
        imgSrc: "https://contents.kyobobook.co.kr/sih/fit-in/200x0/pdt/9791167375629.jpg",
        href: "https://product.kyobobook.co.kr/detail/S000216663857",
        text: "치유의 빛"
    }
];

$(document).ready(function() {
    // 스크롤을 맨 위로 이동
    $(window).scrollTop(0);
    
    displayBooks();
    initScrollAnimations();
});

// 책 목록을 화면에 표시하는 함수
function displayBooks() {
    const $booksGrid = $('#booksGrid');
    
    sibfBooks.forEach((book, index) => {
        const $bookCard = createBookCard(book, index);
        $booksGrid.append($bookCard);
    });
}

// 개별 책 카드를 생성하는 함수
function createBookCard(book, index) {
    const $bookCard = $(`
        <div class="book-card" data-index="${index}">
            <a href="${book.href}" target="_blank" class="book-link">
                <img src="${book.imgSrc}" alt="${book.text}" class="book-image" loading="lazy">
                <div class="book-info">
                    <h3 class="book-title">${book.text}</h3>
                </div>
            </a>
        </div>
    `);
    
    // 클릭 이벤트 추가
    $bookCard.on('click', function(e) {
        // 링크 클릭 시 새 탭에서 열기
        window.open(book.href, '_blank');
    });
    
    return $bookCard;
}

// 스크롤 애니메이션 초기화
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 애니메이션 실행
                animateCard($(entry.target));
            } else {
                // 화면에서 벗어나면 다시 초기 상태로
                resetCard($(entry.target));
            }
        });
    }, observerOptions);
    
    // 모든 책 카드에 애니메이션 적용
    $('.book-card').each(function(index) {
        const $card = $(this);
        // 초기 상태 설정
        resetCard($card, index);
        observer.observe(this);
    });
    
    // 섹션별 애니메이션
    $('.intro-section, .info-section').each(function() {
        const $section = $(this);
        resetSection($section);
        
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSection($(entry.target));
                } else {
                    resetSection($(entry.target));
                }
            });
        }, { threshold: 0.2 });
        
        sectionObserver.observe(this);
    });
}

// 카드 애니메이션 실행 함수
function animateCard($card) {
    const index = $card.data('index') || 0;
    const delay = index * 0.15;
    
    setTimeout(() => {
        $card.css({
            'opacity': '1',
            'transform': 'translateY(0)'
        });
    }, delay * 1000);
}

// 카드 초기 상태로 리셋
function resetCard($card, index = 0) {
    $card.css({
        'opacity': '0',
        'transform': 'translateY(60px)',
        'transition': 'opacity 0.8s ease, transform 0.8s ease'
    }).data('index', index);
}

// 섹션 애니메이션 실행 함수
function animateSection($section) {
    $section.css({
        'opacity': '1',
        'transform': 'translateY(0)'
    });
}

// 섹션 초기 상태로 리셋
function resetSection($section) {
    $section.css({
        'opacity': '0',
        'transform': 'translateY(40px)',
        'transition': 'opacity 0.8s ease, transform 0.8s ease'
    });
}

// 페이지 로드 시 부드러운 페이드인 효과
$(window).on('load', function() {
    // 스크롤을 맨 위로 이동 (load 이벤트에서도 한 번 더)
    $(window).scrollTop(0);
    
    $('body').css({
        'opacity': '0',
        'transition': 'opacity 0.8s ease'
    });
    
    setTimeout(() => {
        $('body').css('opacity', '1');
    }, 100);
});

// CSS 클래스 추가를 위한 함수
function addAnimationClass(element, className) {
    element.classList.add(className);
}

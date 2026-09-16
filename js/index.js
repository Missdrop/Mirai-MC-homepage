const boxes = document.querySelectorAll('.s-box');
const scrollThreshold = 100;

window.addEventListener('scroll', function() {
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY > scrollThreshold) {
        boxes.forEach((box, index) => {
            setTimeout(() => {
                box.classList.add('box-appear');
            }, index * 300);
        });
    } else {
        boxes.forEach(box => {
            box.classList.remove('box-appear');
        });
    }
});

const pingElements = document.querySelectorAll('[ping]');

async function updatePing(element) {
    const host = element.getAttribute('ping');
    const url = `https://v2.xxapi.cn/api/ping?url=${encodeURIComponent(host)}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    element.textContent = '测量中';

    try {
        const response = await fetch(url, {
            cache: 'no-store',
            signal: controller.signal
        });
        const result = await response.text();
        const match = result.match(/(?:平均|avg|average|ping|time)[^\d]*(\d+(?:\.\d+)?)\s*ms/i)
            || result.match(/(\d+(?:\.\d+)?)\s*ms/i);

        if (!response.ok || !match) {
            throw new Error('Ping API 返回了无法识别的结果');
        }

        element.textContent = `${Number(match[1]).toFixed(3)} ms`;
    } catch (error) {
        element.textContent = '错误';
    } finally {
        clearTimeout(timeout);
    }
}

pingElements.forEach((element) => {
    updatePing(element);
    setInterval(() => updatePing(element), 30000);
});
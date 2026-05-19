function copyText(element) {
    const tempInput = document.createElement('input')
    tempInput.value = element.innerText

    document.body.appendChild(tempInput)

    tempInput.select()
    tempInput.setSelectionRange(0, 99999)

    try {
    const successful = document.execCommand('copy')

    if(successful) {
    const originalText = element.innerText
    element.innerText = '✅ 复制成功！'

    setTimeout(() => {
    element.innerText = originalText
    document.body.removeChild(tempInput)
}, 1000)
}
} catch (err) {
    console.error('复制失败:', err)
}
}

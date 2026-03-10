// 安全地转义HTML特殊字符
function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// 格式化方程组显示
function formatEquations(equations) {
    if (!equations || equations.length === 0) return '';
    
    return equations.map((line) => {
        const escaped = escapeHtml(line.trim());
        return '<div class="equation-line">' + escaped + '</div>';
    }).join('');
}

// 显示题目（包括方程组格式化）
function displayQuestion(questionText) {
    const questionDiv = document.getElementById('questionText');
    
    // 按行分割
    const lines = questionText.split('\n');
    
    if (lines.length <= 1) {
        // 纯文字题，直接显示
        questionDiv.innerHTML = escapeHtml(questionText);
    } else {
        // 包含方程的题
        const description = lines[0]; // 第一行是描述
        const equations = lines.slice(1).filter(line => line.trim() !== ''); // 过滤空行
        
        if (equations.length === 0) {
            questionDiv.innerHTML = escapeHtml(description);
            return;
        }
        
        // 生成方程组HTML
        const equationsHtml = formatEquations(equations);
        
        // 组装完整题目
        questionDiv.innerHTML = 
            '<div class="question-desc">' + escapeHtml(description) + '</div>' +
            '<div class="equation-wrapper">' +
                '<div class="equation-bracket-visual"></div>' +
                '<div class="equation-list">' + equationsHtml + '</div>' +
            '</div>';
    }
}
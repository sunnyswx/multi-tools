#!/usr/bin/env python3
"""
批量添加工具页面问题反馈功能
"""

import os
import re

def add_feedback_section(html_content, tool_name):
    """添加工具页面的问题反馈区域"""
    
    # 问题反馈HTML代码
    feedback_html = '''
            <!-- 问题反馈区域 -->
            <div class="feedback-section">
                <h3>💬 问题反馈</h3>
                <p style="color: #666; margin-bottom: 20px;">发现bug或使用问题？请告诉我们，我们会尽快修复！</p>
                
                <form class="feedback-form" id="feedbackForm" onsubmit="submitFeedback(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="feedbackName">您的姓名（可选）</label>
                            <input type="text" id="feedbackName" placeholder="输入您的姓名">
                        </div>
                        <div class="form-group">
                            <label for="feedbackEmail">您的邮箱（可选）</label>
                            <input type="email" id="feedbackEmail" placeholder="input@example.com">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="feedbackType">问题类型</label>
                        <select id="feedbackType" style="width: 100%; padding: 12px 15px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 14px;">
                            <option value="bug">🐛 Bug报告</option>
                            <option value="feature">✨ 功能建议</option>
                            <option value="performance">⚡ 性能问题</option>
                            <option value="ui">🎨 界面问题</option>
                            <option value="other">📝 其他</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="feedbackMessage">问题描述 *</label>
                        <textarea id="feedbackMessage" placeholder="请详细描述您遇到的问题或建议..." required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="feedbackBrowser">
                            包含浏览器信息（帮助快速定位问题）
                        </label>
                    </div>
                    
                    <button type="submit" class="btn-submit">提交反馈</button>
                </form>
                
                <div class="feedback-success" id="feedbackSuccess">
                    ✅ 感谢您的反馈！我们会尽快处理。
                </div>
                
                <div class="feedback-error" id="feedbackError">
                    ❌ 提交失败，请稍后重试。
                </div>
            </div>
            
            <a href="/" class="back-link">← 返回首页</a>
        </div>
        
        <footer>
            <p>© 2026 Multi Tools - 免费在线工具集</p>
        </footer>
    </div>
    
    <script>
        // 问题反馈功能
        function submitFeedback(e) {
            e.preventDefault();
            
            const name = document.getElementById('feedbackName').value.trim();
            const email = document.getElementById('feedbackEmail').value.trim();
            const type = document.getElementById('feedbackType').value;
            const message = document.getElementById('feedbackMessage').value.trim();
            const includeBrowser = document.getElementById('feedbackBrowser').checked;
            
            if (!message) {
                alert('请填写问题描述！');
                return;
            }
            
            // 构建反馈数据
            const feedbackData = {
                tool: '""" + tool_name + """',
                timestamp: new Date().toISOString(),
                name: name || '匿名用户',
                email: email || '',
                type: type,
                message: message,
                browser: includeBrowser ? navigator.userAgent : ''
            };
            
            // 保存到localStorage
            try {
                const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
                feedbacks.push(feedbackData);
                localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
                
                // 显示成功消息
                document.getElementById('feedbackSuccess').style.display = 'block';
                document.getElementById('feedbackError').style.display = 'none';
                
                // 清空表单
                document.getElementById('feedbackForm').reset();
                
                trackToolUsage('""" + tool_name + """', 'feedback');
                
                // 3秒后隐藏成功消息
                setTimeout(() => {
                    document.getElementById('feedbackSuccess').style.display = 'none';
                }, 3000);
            } catch (error) {
                // 显示错误消息
                document.getElementById('feedbackError').style.display = 'block';
                document.getElementById('feedbackSuccess').style.display = 'none';
                console.error('反馈提交失败:', error);
            }
        }
    </script>
</body>
</html>'''
    
    # 找到 </a> 标签（返回首页链接）
    back_link_pos = html_content.rfind('</a>')
    if back_link_pos == -1:
        return None
    
    # 找到对应的 </div> 标签
    container_end = html_content.find('</div>', back_link_pos)
    if container_end == -1:
        return None
    
    # 在 </div> 前插入反馈区域
    new_content = html_content[:container_end] + feedback_html + html_content[container_end:]
    
    return new_content

def add_feedback_css(css_content):
    """添加反馈区域的CSS样式"""
    
    feedback_css = '''
        /* 问题反馈样式 */
        .feedback-section {
            margin-top: 40px;
            padding: 30px;
            background: #f8f9fa;
            border-radius: 15px;
        }
        
        .feedback-section h3 {
            color: #333;
            margin-bottom: 20px;
            font-size: 1.3rem;
        }
        
        .feedback-form {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .feedback-form textarea {
            width: 100%;
            padding: 15px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 14px;
            resize: vertical;
            min-height: 120px;
            font-family: inherit;
        }
        
        .feedback-form textarea:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .feedback-form .form-row {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
        }
        
        .feedback-form .form-group {
            flex: 1;
            min-width: 200px;
        }
        
        .feedback-form label {
            display: block;
            font-weight: bold;
            color: #333;
            margin-bottom: 8px;
            font-size: 14px;
        }
        
        .feedback-form input[type="text"],
        .feedback-form input[type="email"] {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.3s;
        }
        
        .feedback-form input[type="text"]:focus,
        .feedback-form input[type="email"]:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .feedback-form .btn-submit {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: 500;
            align-self: flex-start;
        }
        
        .feedback-form .btn-submit:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        }
        
        .feedback-success {
            background: #d1fae5;
            color: #065f46;
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            display: none;
        }
        
        .feedback-error {
            background: #fee2e2;
            color: #991b1b;
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            display: none;
        }
    '''
    
    # 在 </style> 前插入CSS
    style_end = css_content.rfind('</style>')
    if style_end == -1:
        return css_content
    
    return css_content[:style_end] + feedback_css + css_content[style_end:]

def process_tool_files():
    """处理所有工具文件，添加反馈功能"""
    
    tools_dir = 'tools'
    processed_count = 0
    
    # 获取所有工具文件
    tool_files = [f for f in os.listdir(tools_dir) if f.endswith('.html') and not f.endswith('-seo.html')]
    
    for tool_file in tool_files:
        file_path = os.path.join(tools_dir, tool_file)
        
        # 读取文件内容
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查是否已添加反馈功能
        if 'feedback-section' in content:
            print(f'✓ {tool_file}: 已存在反馈功能')
            continue
        
        # 提取工具名称
        tool_name = tool_file.replace('.html', '')
        
        # 添加反馈CSS
        content = add_feedback_css(content)
        
        # 添加反馈HTML和JavaScript
        new_content = add_feedback_section(content, tool_name)
        
        if new_content:
            # 保存文件
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f'✓ {tool_file}: 已添加反馈功能')
            processed_count += 1
        else:
            print(f'✗ {tool_file}: 添加失败')
    
    print(f'\n✅ 总共处理了 {processed_count} 个工具文件')
    return processed_count

if __name__ == '__main__':
    count = process_tool_files()
    print(f'\n完成了 {count} 个工具页面的问题反馈功能添加')
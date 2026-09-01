#!/usr/bin/env node
/**
 * GitHub Push with Retry Mechanism
 * 重试3次，每次间隔300秒
 */

const { execSync } = require('child_process');
const path = require('path');

const PROJECT_DIR = path.join(__dirname, '..');
const MAX_RETRIES = 3;
const RETRY_DELAY = 300; // 秒

function sleep(seconds) {
    console.log(`等待 ${seconds} 秒后重试...`);
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

async function pushWithRetry() {
    console.log('='.repeat(50));
    console.log('GitHub Push with Retry Mechanism');
    console.log('='.repeat(50));
    console.log('');
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        console.log(`[尝试 ${attempt}/${MAX_RETRIES}] 推送代码到GitHub...`);
        
        try {
            // 执行git push
            const result = execSync('git push origin main', {
                cwd: PROJECT_DIR,
                encoding: 'utf-8',
                stdio: 'pipe'
            });
            
            console.log('');
            console.log('✅ 推送成功！');
            console.log(result);
            console.log('');
            console.log('='.repeat(50));
            return true;
            
        } catch (error) {
            console.log('');
            console.log('❌ 推送失败：');
            console.log(error.stderr?.toString() || error.stdout?.toString() || error.message);
            console.log('');
            
            if (attempt < MAX_RETRIES) {
                console.log(`等待 ${RETRY_DELAY} 秒后重试...`);
                await sleep(RETRY_DELAY);
                console.log('');
            } else {
                console.log('');
                console.log('❌ 已达到最大重试次数，推送失败！');
                console.log('');
                console.log('请雄哥手动推送：');
                console.log(`  cd ${PROJECT_DIR}`);
                console.log('  git push origin main');
                console.log('');
            }
        }
    }
    
    return false;
}

// 主函数
async function main() {
    console.log('项目目录:', PROJECT_DIR);
    console.log('重试次数:', MAX_RETRIES);
    console.log('重试间隔:', RETRY_DELAY, '秒');
    console.log('');
    
    const success = await pushWithRetry();
    
    if (!success) {
        process.exit(1);
    }
}

main().catch(console.error);

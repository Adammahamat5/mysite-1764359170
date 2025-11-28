// LambdaMine Pro - Mining Application
class LambdaMine {
    constructor() {
        this.miningRate = 0.00001; // $LAMDA per second
        this.miningInterval = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
        this.currentBalance = 0;
        this.totalMined = 0;
        this.cyclesCompleted = 0;
        this.isMining = false;
        this.miningStartTime = null;
        this.intervalId = null;
        this.progressIntervalId = null;
        
        this.initializeApp();
    }

    initializeApp() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.updateDisplay();
        this.startProgressTimer();
    }

    loadFromStorage() {
        const savedData = localStorage.getItem('lambdaMineData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.currentBalance = data.currentBalance || 0;
            this.totalMined = data.totalMined || 0;
            this.cyclesCompleted = data.cyclesCompleted || 0;
            this.miningStartTime = data.miningStartTime ? new Date(data.miningStartTime) : null;
            
            if (this.miningStartTime) {
                const elapsed = Date.now() - this.miningStartTime.getTime();
                if (elapsed < this.miningInterval) {
                    this.startMining(false);
                } else {
                    this.completeMiningCycle();
                }
            }
        }
    }

    saveToStorage() {
        const data = {
            currentBalance: this.currentBalance,
            totalMined: this.totalMined,
            cyclesCompleted: this.cyclesCompleted,
            miningStartTime: this.miningStartTime
        };
        localStorage.setItem('lambdaMineData', JSON.stringify(data));
    }

    setupEventListeners() {
        document.getElementById('startMiningBtn').addEventListener('click', () => {
            this.startMining(true);
        });

        document.getElementById('claimBtn').addEventListener('click', () => {
            this.claimTokens();
        });
    }

    startMining(showAlert = true) {
        if (this.isMining) return;

        this.isMining = true;
        this.miningStartTime = new Date();
        
        // Update UI
        document.getElementById('startMiningBtn').classList.add('mining-active');
        document.getElementById('startMiningBtn').innerHTML = '<i data-feather="zap" class="inline mr-2"></i>Minage en Cours...';
        feather.replace();
        
        // Start mining calculation interval
        this.intervalId = setInterval(() => {
            this.updateMiningBalance();
        }, 1000);

        if (showAlert) {
            this.showNotification('Minage démarré ! Récolte dans 2 heures.', 'success');
        }

        this.saveToStorage();
        this.updateDisplay();
    }

    updateMiningBalance() {
        if (!this.isMining || !this.miningStartTime) return;

        const elapsed = Date.now() - this.miningStartTime.getTime();
        const earned = (elapsed / 1000) * this.miningRate;
        
        this.currentBalance = earned;
        this.updateDisplay();

        // Check if mining cycle is complete
        if (elapsed >= this.miningInterval) {
            this.completeMiningCycle();
        }
    }

    completeMiningCycle() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        this.isMining = false;
        this.cyclesCompleted++;
        this.totalMined += this.currentBalance;

        // Enable claim button
        document.getElementById('claimBtn').classList.remove('opacity-50', 'cursor-not-allowed');
        document.getElementById('startMiningBtn').classList.remove('mining-active');
        document.getElementById('startMiningBtn').innerHTML = '<i data-feather="play" class="inline mr-2"></i>Démarrer le Minage';
        feather.replace();

        this.showNotification('Cycle de minage terminé ! Vous pouvez récolter vos tokens.', 'success');
        this.saveToStorage();
        this.updateDisplay();
    }

    claimTokens() {
        if (this.currentBalance <= 0) {
            this.showNotification('Aucun token à récolter.', 'warning');
            return;
        }

        const claimedAmount = this.currentBalance;
        this.currentBalance = 0;
        this.miningStartTime = null;

        // Disable claim button
        document.getElementById('claimBtn').classList.add('opacity-50', 'cursor-not-allowed');

        this.showNotification(`✅ ${claimedAmount.toFixed(6)} $LAMDA récoltés avec succès !`, 'success');
        this.saveToStorage();
        this.updateDisplay();
    }

    updateDisplay() {
        // Update current balance
        document.getElementById('currentBalance').textContent = this.currentBalance.toFixed(6);
        
        // Update total mined
        document.getElementById('totalMined').textContent = `${this.totalMined.toFixed(6)} $LAMDA`;
        
        // Update cycles completed
        document.getElementById('cyclesCompleted').textContent = this.cyclesCompleted;

        // Update progress bar and percentage
        this.updateProgressBar();
    }

    updateProgressBar() {
        if (!this.isMining || !this.miningStartTime) {
            document.getElementById('miningProgress').style.width = '0%';
            document.getElementById('progressPercentage').textContent = '0%';
            document.getElementById('nextMiningTime').textContent = '--:--:--';
            return;
        }

        const elapsed = Date.now() - this.miningStartTime.getTime();
        const progress = Math.min((elapsed / this.miningInterval) * 100, 100);
        document.getElementById('miningProgress').style.width = `${progress}%`;
        document.getElementById('progressPercentage').textContent = `${Math.round(progress)}%`;

        // Update next mining time
        const remaining = this.miningInterval - elapsed;
        if (remaining > 0) {
            const hours = Math.floor(remaining / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
            
            document.getElementById('nextMiningTime').textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            document.getElementById('nextMiningTime').textContent = '00:00:00';
        }
    }

    startProgressTimer() {
        this.progressIntervalId = setInterval(() => {
            this.updateProgressBar();
        }, 1000);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-2xl shadow-2xl transform transition-all duration-300 ${
            type === 'success' ? 'bg-green-500/90' : 
            type === 'warning' ? 'bg-yellow-500/90' : 
            'bg-blue-500/90'
        }`;
        
        notification.innerHTML = `
            <div class="flex items-center">
                <i data-feather="${
                    type === 'success' ? 'check-circle' : 
                    type === 'warning' ? 'alert-triangle' : 
                    'info'
                }" class="mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        feather.replace();
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.classList.add('opacity-0', 'translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.lambdaMine = new LambdaMine();
});

// Service Worker-like functionality for background mining (simulated)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // This is just for demonstration - in a real app you'd register a service worker
        console.log('LambdaMine Pro - Ready for background mining operations');
    });
}
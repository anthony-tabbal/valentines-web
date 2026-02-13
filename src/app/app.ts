import { Component, signal, computed } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    protected readonly currentSection = signal(0);
    protected readonly answered = signal(false);
    protected readonly noButtonStyle = signal({ top: '0px', left: '0px' });
    protected readonly noButtonMoved = signal(false);
    protected readonly noAttempts = signal(0);

    protected readonly noButtonMessages = [
        'No',
        'Are you sure?',
        'Really sure?',
        'Think again!',
        'Last chance!',
        'Surely not?',
        'You might regret this!',
        'Give it another thought!',
        'Are you crazy?!',
        'I dare you to try again!',
        'Nope, try again!',
        'Not happening!',
        'Nice try!',
    ];

    protected readonly noButtonText = computed(() => {
        if (!this.noButtonMoved()) return 'No';
        const attempts = this.noAttempts();
        return this.noButtonMessages[Math.min(attempts, this.noButtonMessages.length - 1)];
    });

    protected readonly storyCards = [
        {
            emoji: 'Rose',
            title: 'Budget Romance Alert',
            text: "I was going to buy you a huge bouquet of roses... then I checked the prices and almost passed out. So I made you this website instead: same love, zero wilt, and no need for a vase.",
        },
        {
            emoji: 'Timeline',
            title: 'Quick Trailer',
            text: "Before you scroll like it's Netflix, heads up: the next few cards are our timeline masterpiece, from last year to next year. Romance, chaos, and questionable DIY decisions included.",
        },
        {
            emoji: '🏠',
            title: 'Our Castle',
            text: "6 months ago we got the keys to our very own home. Sure, it's more \"fixer-upper\" than \"fairy tale castle\" right now... but it's OURS. And honestly, I'd live in a cardboard box if it meant being with you.",
        },
        {
            emoji: '🔨',
            title: 'Renovation Mode: ON',
            text: "They say renovating together is the true test of a relationship. Well, we've survived debates, kitchen supply trips, and your dad. If we can survive this, we can survive anything!",
        },
        {
            emoji: '💍',
            title: "What's Coming Next Week...",
            text: "How am I supposed to focus on anything knowing that next week you officially become my fiancée? I'm out here acting calm, but inside I'm walking around like I just won the lottery. One more week until I put that ring on your finger and upgrade us to the next level.",
        },
        {
            emoji: '👰',
            title: 'Next Year...',
            text: "Next year, we'll be saying \"I do\"! I honestly can't wait to call you my wife. The wedding planning hasn't started yet and I'm already excited. Someone get me a tissue. Actually, get me a whole box.",
        },
        {
            emoji: '😂',
            title: 'Fun Facts About Us',
            text: "We survived house renovations decisions, engagement stress, and the absolute genius-level decisions of our interior designer… and we're still standing.You may not be the strongest in mathematics, but somehow you're still the smarter one between us (especially when I'm buying my 47th “very necessary” electronic device). You're the dramatic one, you apologize first, and at the end of the day it's just us — lying next to each other under our own blankets, laughing at everything we've survived together."
        },
        {
            emoji: '❤️',
            title: 'I Love You',
            // text: "I would cross oceans for you. I would climb mountains for you. I would fight dragons for you. But most importantly... I would assemble IKEA furniture for you. And if that's not true love, I don't know what is.",
        },
    ];

    protected moveNoButton(event: MouseEvent | TouchEvent): void {
        event.preventDefault();
        const button = event.target as HTMLElement;
        const container = button.closest('.question-section') as HTMLElement;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const btnWidth = button.offsetWidth;
        const btnHeight = button.offsetHeight;

        const maxX = containerRect.width - btnWidth - 20;
        const maxY = containerRect.height - btnHeight - 20;

        const randomX = Math.max(20, Math.random() * maxX);
        const randomY = Math.max(20, Math.random() * maxY);

        this.noButtonStyle.set({
            top: `${randomY}px`,
            left: `${randomX}px`,
        });
        this.noButtonMoved.set(true);
        this.noAttempts.update((n) => n + 1);
    }

    protected sayYes(): void {
        this.answered.set(true);
    }

    protected nextSection(): void {
        const next = Math.min(this.currentSection() + 1, this.storyCards.length + 1);
        if (next === this.storyCards.length + 1) {
            this.noButtonMoved.set(false);
            this.noAttempts.set(0);
        }
        this.currentSection.set(next);
    }

    protected prevSection(): void {
        this.currentSection.update((s) => Math.max(s - 1, 0));
    }

    protected goToQuestion(): void {
        this.noButtonMoved.set(false);
        this.noAttempts.set(0);
        this.currentSection.set(this.storyCards.length + 1);
    }
}





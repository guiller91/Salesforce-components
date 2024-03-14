import { LightningElement, api } from 'lwc';
import analyzeSentiment from '@salesforce/apex/NaturalLanguageService.analyzeSentiment';

export default class NaturalLanguageComponent extends LightningElement {
    inputText;
    sentimentResult;
    sentimentScore; 
    sentimentMagnitude; 

    handleInputChange(event) {
        this.inputText = event.target.value;
    }

    handleAnalyzeSentiment() {
        analyzeSentiment({ text: this.inputText })
            .then(result => {
                this.sentimentResult = result;
                this.sentimentScore = result.score;
                this.sentimentMagnitude = result.magnitude;
            })
            .catch(error => {
                console.error('Error al analizar el sentimiento:', error);
                this.sentimentResult = 'Error al procesar el análisis de sentimiento.';
            });
    }

    get normalizedScore() {
        
        return ((this.sentimentScore + 1) / 2) * 100;
    }

    get normalizedMagnitude() {
        
        const maxTypicalMagnitude = 2;
        return (this.sentimentMagnitude / maxTypicalMagnitude) * 100;
    }

    get scoreVariant() {
        return this.getSentimentVariant(this.normalizedScore);
    }

    get progressBarStyle() {
        return `width: ${this.normalizedScore}%; background-color: ${this.getBarColor(this.normalizedScore)};`;
    }
    
    getSentimentVariant(normalizedScore) {
        if (normalizedScore >= 80) {
            return 'positive'; // Verde
        } else if (normalizedScore >= 60) {
            return 'lightly-positive'; // Verde claro
        } else if (normalizedScore >= 40) {
            return 'neutral'; // Amarillo
        } else if (normalizedScore >= 20) {
            return 'lightly-negative'; // Naranja
        } else {
            return 'negative'; // Rojo
        }
    }

    getBarColor(normalizedScore) {
        if (normalizedScore >= 80) {
            return 'green'; // Verde
        } else if (normalizedScore >= 60) {
            return '#90ee90'; // Verde claro
        } else if (normalizedScore >= 40) {
            return 'yellow'; // Amarillo
        } else if (normalizedScore >= 20) {
            return 'orange'; // Naranja
        } else {
            return 'red'; // Rojo
        }
    }
}

public with sharing class NaturalLanguageService {
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> analyzeSentiment(String text) {
        // Endpoint configurado a través del Named Credential
        String endpoint = 'callout:VertexAI/v2/documents:analyzeSentiment';

        // Creación del cuerpo de la solicitud
        Map<String, Object> requestBody = new Map<String, Object>{
            'document' => new Map<String, Object>{
                'content' => text,
                'type' => 'PLAIN_TEXT'
            },
            'encodingType' => 'UTF8'
        };

        // Configuración y envío de la solicitud HTTP
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endpoint);
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json');
        request.setBody(JSON.serialize(requestBody));
        String serializedBody = JSON.serialize(requestBody);
        System.debug('Request body: ' + serializedBody);

        // Crear un mapa para almacenar el score y la magnitude
        Map<String, Object> sentimentResult = new Map<String, Object>();

        try {
            HttpResponse response = http.send(request);
            System.debug('Raw response: ' + response.getBody());
            if (response.getStatusCode() == 200) {
                // Procesa y extrae la información relevante de la respuesta
                Map<String, Object> resBody = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                Map<String, Object> documentSentiment = (Map<String, Object>)resBody.get('documentSentiment');
                sentimentResult.put('score', (Decimal)documentSentiment.get('score'));
                sentimentResult.put('magnitude', (Decimal)documentSentiment.get('magnitude'));
                System.debug('Sentiment: ' + sentimentResult);
            } else {
                System.debug('Error en la respuesta de la API: ' + response.getStatusCode() + ' ' + response.getBody());
                sentimentResult.put('error', 'Error al procesar la respuesta de la API.');
            }
        } catch (Exception e) {
            System.debug('Excepción al llamar a la API: ' + e.getMessage());
            sentimentResult.put('error', 'Error al realizar la llamada a la API.');
        }

        return sentimentResult;
    }
}
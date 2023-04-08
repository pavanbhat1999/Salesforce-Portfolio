public with sharing class encrypt {
    public encrypt() {
        return;
    }
    @AuraEnabled
    public static string passwordEncode(String passtxt){
        try {
            System.debug('Text from LWc'+passtxt);
            Blob exampleIv = Blob.valueOf('Example of IV123');
            Blob key = Crypto.generateAesKey(128);
            Blob data = Blob.valueOf(passtxt);
            Blob encrypted = Crypto.encrypt('AES128', key, exampleIv, data);
            
            return EncodingUtil.base64Encode(encrypted);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}
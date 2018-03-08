package umm3601.emotion;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.*;
import org.bson.codecs.*;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.json.JsonReader;
import org.bson.types.ObjectId;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static org.junit.Assert.*;

public class EmotionControllerSpec
{
    private EmotionController emotionController;
    private ObjectId blakesId;
    @Before
    public void clearAndPopulateDB() throws IOException {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase("test");
        MongoCollection<Document> emotionDocuments = db.getCollection("moods");
        emotionDocuments.drop();
        List<Document> testEmotions = new ArrayList<>();
        testEmotions.add(Document.parse("{\n" +
            "                    mood: \"radiant\",\n" +
            "                    date: \"Wed Mar 12 2018 07:46:00 GMT-0600 (CST)\"\n" +
            "                }"));
        testEmotions.add(Document.parse("{\n" +
            "                    mood: \"down\",\n" +
            "                    date: \"Thu Mar 26 2018 16:18:00 GMT-0600 (CST)\"\n" +
            "                }"));
        testEmotions.add(Document.parse("{\n" +
            "                    mood: \"sad\",\n" +
            "                    date: \"Mon Mar 25 2018 22:51:00 GMT-0600 (CST)\"\n" +
            "                }"));


        blakesId = new ObjectId();
        BasicDBObject blake = new BasicDBObject("_id", blakesId);
        blake = blake.append("mood", "radiant")
            .append("date", "Sat Mar 18 2018 20:23:00 GMT-0600 (CST)");



        emotionDocuments.insertMany(testEmotions);
        emotionDocuments.insertOne(Document.parse(blake.toJson()));

        // It might be important to construct this _after_ the DB is set up
        // in case there are bits in the constructor that care about the state
        // of the database.
        emotionController = new EmotionController(db);
    }

    // http://stackoverflow.com/questions/34436952/json-parse-equivalent-in-mongo-driver-3-x-for-java
    private BsonArray parseJsonArray(String json) {
        final CodecRegistry codecRegistry
                = CodecRegistries.fromProviders(Arrays.asList(
                new ValueCodecProvider(),
                new BsonValueCodecProvider(),
                new DocumentCodecProvider()));

        JsonReader reader = new JsonReader(json);
        BsonArrayCodec arrayReader = new BsonArrayCodec(codecRegistry);

        return arrayReader.decode(reader, DecoderContext.builder().build());
    }


    //These tests are a little odd, because adding is done exclusively in this controller,
    //while getting is done in the other controller: SummaryControllerSpec
    @Test
    public void addJacobEmotion() {
        Map<String, String[]> argMap = new HashMap<>();
        String jsonResult = emotionController.getEmotions(argMap);
        BsonArray docs = parseJsonArray(jsonResult);
        assertEquals("Should be 4 entry", 4, docs.size());

        emotionController.addNewEmotion("anxious", "Sat Mar 24 2018 03:27:00 GMT-0600 (CST)");

        jsonResult = emotionController.getEmotions(argMap);
        docs = parseJsonArray(jsonResult);
        assertEquals("Should be 5 entry", 5, docs.size());
    }


}

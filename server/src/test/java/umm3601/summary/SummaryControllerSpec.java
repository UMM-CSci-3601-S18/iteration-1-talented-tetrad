package umm3601.summary;
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

public class SummaryControllerSpec
{
    private SummaryController summaryController;
    private ObjectId mattsId;
    @Before
    public void clearAndPopulateDB() throws IOException {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase("test");
        MongoCollection<Document> summaryDocuments = db.getCollection("emotions");
        summaryDocuments.drop();
        List<Document> testSummarys = new ArrayList<>();
        testSummarys.add(Document.parse("{\n" +
                "                    mood: \"radiant\",\n" +
                "                    date: \"Wed Mar 12 2018 07:46:00 GMT-0600 (CST)\"\n" +
                "                }"));
        testSummarys.add(Document.parse("{\n" +
            "                    mood: \"down\",\n" +
            "                    date: \"Thu Mar 26 2018 16:18:00 GMT-0600 (CST)\"\n" +
            "                }"));
        testSummarys.add(Document.parse("{\n" +
            "                    mood: \"sad\",\n" +
            "                    date: \"Mon Mar 25 2018 22:51:00 GMT-0600 (CST)\"\n" +
            "                }"));

        mattsId = new ObjectId();
        BasicDBObject matt = new BasicDBObject("_id", mattsId);
        matt = matt.append("mood", "radiant")
                .append("date", "Sat Mar 18 2018 20:23:00 GMT-0600 (CST)");

        summaryDocuments.insertMany(testSummarys);
        summaryDocuments.insertOne(Document.parse(matt.toJson()));

        // It might be important to construct this _after_ the DB is set up
        // in case there are bits in the constructor that care about the state
        // of the database.
        summaryController = new SummaryController(db);
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

    private static String getMood(BsonValue val) {
        BsonDocument doc = val.asDocument();
        return ((BsonString) doc.get("mood")).getValue();
    }

    private static String getDate(BsonValue val) {
        BsonDocument doc = val.asDocument();
        return ((BsonString) doc.get("date")).getValue();
    }


    //Failing
    @Test
    public void getAllSummarys() {
        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = summaryController.getSummarys(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 4 users", 4, docs.size());
        List<String> moods = docs
                .stream()
                .map(SummaryControllerSpec::getMood)
                .sorted()
                .collect(Collectors.toList());
        List<String> expectedMoods = Arrays.asList("down", "radiant", "radiant", "sad");
        assertEquals("Moods should match", expectedMoods, moods);
    }

    @Test
    public void getSummarysWhoAreRadiant() {
        Map<String, String[]> argMap = new HashMap<>();
        argMap.put("mood", new String[] { "radiant" });
        String jsonResult = summaryController.getSummarys(argMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 2 entry", 2, docs.size());
        List<String> moods = docs
                .stream()
                .map(SummaryControllerSpec::getMood)
                .sorted()
                .collect(Collectors.toList());
        List<String> expectedMoods = Arrays.asList("radiant", "radiant");
        assertEquals("Mood should match", expectedMoods, moods);
    }

    @Test
    public void getMattById() {
        String jsonResult = summaryController.getSummary(mattsId.toHexString());
        Document matt = Document.parse(jsonResult);
        assertEquals("Mood should match", "radiant", matt.get("mood"));
        String noJsonResult = summaryController.getSummary(new ObjectId().toString());
        assertNull("No mood should match",noJsonResult);
    }


    //Failing
    @Test
    public void getMoodByDate(){
        Map<String, String[]> argMap = new HashMap<>();
        argMap.put("date", new String[] { "Wed Mar 12 2018 07:46:00 GMT-0600 (CST)" });
        String jsonResult = summaryController.getSummarys(argMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 1 entry", 1, docs.size());
        List<String> dates = docs
            .stream()
            .map(SummaryControllerSpec::getDate)
            .sorted()
            .collect(Collectors.toList());
        List<String> expectedDates = Arrays.asList("Wed Mar 12 2018 07:46:00 GMT-0600 (CST)");
        assertEquals("Mood should match", expectedDates, dates);

    }

}

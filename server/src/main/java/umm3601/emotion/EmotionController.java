package umm3601.emotion;

import com.google.gson.Gson;
import com.mongodb.*;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.util.JSON;
import org.bson.Document;
import org.bson.types.ObjectId;
import java.util.Iterator;
import java.util.Map;
import static com.mongodb.client.model.Filters.eq;

public class EmotionController {
    private final Gson gson;
    private MongoDatabase database;
    private final MongoCollection<Document> emotionCollection;

    public EmotionController(MongoDatabase database) {
        gson = new Gson();
        this.database = database;
        emotionCollection = database.getCollection("summarys");
    }

    public String getEmotion(String id) {
        FindIterable<Document> jsonEmotions
            = emotionCollection
            .find(eq("_id", new ObjectId(id)));
        Iterator<Document> iterator = jsonEmotions.iterator();
        if (iterator.hasNext()) {
            Document emotion = iterator.next();
            return emotion.toJson();
        } else {
            // We didn't find the desired emotion
            return null;
        }
    }

    public String addNewEmotion(String mood, double time, int day, int month, int year) {
        Document newEmotion = new Document();
        newEmotion.append("mood", mood);
        newEmotion.append("time", time);
        newEmotion.append("day", day);
        newEmotion.append("month", month);
        newEmotion.append("year", year);
        try {
            emotionCollection.insertOne(newEmotion);
            ObjectId id = newEmotion.getObjectId("_id");
            System.err.println("Successfully added new emotion [_id=" + id + ", mood=" + mood + ", time=" + time + " day=" + day + " month=" + month +  " year=" + year + ']');
            return JSON.serialize(id);
        } catch(MongoException me) {
            me.printStackTrace();
            return null;
        }
    }
}

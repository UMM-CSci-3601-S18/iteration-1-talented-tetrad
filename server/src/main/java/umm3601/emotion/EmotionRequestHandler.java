package umm3601.emotion;


import com.mongodb.BasicDBObject;
import com.mongodb.util.JSON;
import org.bson.types.ObjectId;
import spark.Request;
import spark.Response;

public class EmotionRequestHandler {
    private final EmotionController emotionController;
    public EmotionRequestHandler(EmotionController emotionController){
        this.emotionController = emotionController;
    }

    public String addNewEmotion(Request req, Response res)
    {
        res.type("application/json");
        Object o = JSON.parse(req.body());
        try {
            if(o.getClass().equals(BasicDBObject.class))
            {
                try {
                    BasicDBObject dbO = (BasicDBObject) o;
                    String mood = dbO.getString("mood");
                    String time = dbO.getString("time");
                    String day = dbO.getString("day");
                    String month = dbO.getString("month");
                    String year = dbO.getString("year");

                    System.err.println("Adding new user [mood=" + mood + ", time=" + time + " day=" + day + " month=" + month +  " year=" + year + ']');
                    return emotionController.addNewEmotion(mood, time, day, month, year).toString();
                }
                catch(NullPointerException e)
                {
                    System.err.println("A value was malformed or omitted, new emotion request failed.");
                    return null;
                }
            }
            else
            {
                System.err.println("Expected BasicDBObject, received " + o.getClass());
                return null;
            }
        }
        catch(RuntimeException ree)
        {
            ree.printStackTrace();
            return null;
        }
    }
}

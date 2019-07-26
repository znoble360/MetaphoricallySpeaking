package com.noble.zachary.metaphoricallyspeaking;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Scanner;

public class MainActivity extends AppCompatActivity
{

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {

	    super.onCreate(savedInstanceState);
	    setContentView(R.layout.activity_main);

	    Button searchActivityBtn = findViewById(R.id.searchBtn);
	    searchActivityBtn.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                Intent startIntent = new Intent(getApplicationContext(), Results.class);

                startActivity(startIntent);
            }
        });

	    Button toastTest = findViewById(R.id.toast_test);
	    toastTest.setOnClickListener(new View.OnClickListener()
        {
	        @Override
	        public void onClick(View view)
	        {

		        //String response;


		        //Toast.makeText(MainActivity.this, response, Toast.LENGTH_SHORT).show();
	        }
        });

	    Button avOn = findViewById(R.id.av_on);
	    avOn.setOnClickListener(new View.OnClickListener()
        {
	        @Override
	        public void onClick(View view)
	        {
		        String pc_on = "https://maker.ifttt.com/trigger/pc_on/with/key/bGaHY_dey0UzIxiHK6MKcE";
		        String response;

		        try
		        {
			        response = new HttpRequests().execute(pc_on).get();
			        Toast.makeText(MainActivity.this, response, Toast.LENGTH_SHORT).show();
		        } catch (Exception e)
		        {
			        Toast.makeText(MainActivity.this, e.getMessage(), Toast.LENGTH_SHORT).show();
		        }


	        }
        });

	    Button avOff = findViewById(R.id.av_off);
	    avOff.setOnClickListener(new View.OnClickListener()
	    {
		    @Override
		    public void onClick(View view)
		    {
			    // String pc_off = "https://maker.ifttt.com/trigger/pc_off/with/key/bGaHY_dey0UzIxiHK6MKcE";
			    String pc_off = "https://metaphorically-speaking.herokuapp.com/search/search?searchString=test";
			    String response;

			    try
			    {
				    response = new HttpRequests().execute(pc_off).get();
					Toast.makeText(MainActivity.this, response, Toast.LENGTH_SHORT).show();
			    } catch (Exception e)
			    {
			    	Toast.makeText(MainActivity.this, e.getMessage(), Toast.LENGTH_SHORT).show();
			    }

		    }
	    });
    }

}

class HttpRequests extends AsyncTask<String, Void, String>
{

	@Override
	protected String doInBackground(String... urls)
	{
		return makeHttpPostRequest(urls[0]);
	}

	private static String makeHttpPostRequest(String httpAddress)
	{
		String response= "";
		InputStream inStream;

		try
		{
			URL url = new URL(httpAddress);
			HttpURLConnection urlConn = (HttpURLConnection) url.openConnection();
			urlConn.setConnectTimeout(5000);
			urlConn.setReadTimeout(2500);
			urlConn.setRequestMethod("GET");
			urlConn.setDoInput(true);

			urlConn.connect();

			inStream = urlConn.getInputStream();

			Scanner scanner = new Scanner(inStream);
			while(scanner.hasNext())
			{
				response += scanner.nextLine();
			}

			try
			{
				String metaphors = "";
				JSONObject reader = new JSONObject(response);
				JSONArray results = reader.getJSONArray("searchResults");

				for(int i = 0; i < results.length(); i++)
				{
					JSONObject result = results.getJSONObject(i);
					metaphors += (result.get("text") + ", ");
				}
				return metaphors;

			} catch (JSONException e)
			{
				e.printStackTrace();
			}


		} catch (MalformedURLException e)
		{
			System.out.println("URL error: " + e.getMessage());
		} catch (IOException e)
		{
			System.out.println("Download failed: " + e.getMessage());
		}

		return "error";
	}
}

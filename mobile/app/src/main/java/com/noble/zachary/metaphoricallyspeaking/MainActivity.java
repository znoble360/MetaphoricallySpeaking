package com.noble.zachary.metaphoricallyspeaking;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Scanner;

public class MainActivity extends AppCompatActivity
{
	EditText searchInput;
	private RecyclerView resultsView;
	private RecyclerView.Adapter mAdapter;
	private RecyclerView.LayoutManager mLayoutManager;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
	    super.onCreate(savedInstanceState);
	    setContentView(R.layout.activity_main);

	    searchInput = findViewById(R.id.searchField);
	    resultsView = findViewById(R.id.resultsView);

	    Button searchBtn = findViewById(R.id.searchBtn);
	    searchBtn.setOnClickListener(new View.OnClickListener()
	    {
		    @Override
		    public void onClick(View view)
		    {
		    	String searchString = searchInput.getText().toString();

			    String search_url = getString(R.string.url_base) + getString(R.string.search) + searchString;
			    String response;

			    try
			    {
				    response = new HttpRequests().execute(search_url).get();
					displayResults(response);
			    }
			    catch (Exception e)
			    {
			    	Toast.makeText(MainActivity.this, e.getMessage(), Toast.LENGTH_SHORT).show();
			    }

		    }
	    });

	    /*
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
        */
    }

    void displayResults(String results)
    {
	    try
	    {
		    JSONObject reader = new JSONObject(results);
		    JSONArray JSONResults = reader.getJSONArray("searchResults");
		    ArrayList<MetaphorItem> metaphorList = new ArrayList<>();

		    for(int i = 0; i < JSONResults.length(); i++)
		    {
			    JSONObject result = JSONResults.getJSONObject(i);
			    String metaphor = result.getString("text");
			    String description = result.getString("explanation");

			    metaphorList.add(new MetaphorItem(metaphor, description));
		    }

		    resultsView = findViewById(R.id.resultsView);
		    resultsView.setHasFixedSize(true);
		    mLayoutManager = new LinearLayoutManager(this);
		    mAdapter = new MetaphorAdapter(metaphorList);

		    resultsView.setLayoutManager(mLayoutManager);
		    resultsView.setAdapter(mAdapter);

	    }
	    catch (JSONException e)
	    {
		    e.printStackTrace();
	    }
    }

}

class HttpRequests extends AsyncTask<String, Void, String>
{

	@Override
	protected String doInBackground(String... urls)
	{
		return makeHttpGetRequest(urls[0]);
	}

	private static String makeHttpGetRequest(String httpAddress)
	{
		String response = "";
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

			return response;

		}
		catch (MalformedURLException e)
		{
			System.out.println("URL error: " + e.getMessage());
		}
		catch (IOException e)
		{
			System.out.println("Download failed: " + e.getMessage());
		}

		return "error";
	}
}

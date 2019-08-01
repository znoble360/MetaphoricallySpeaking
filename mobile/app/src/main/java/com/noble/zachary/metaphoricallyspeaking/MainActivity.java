package com.noble.zachary.metaphoricallyspeaking;

import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Scanner;

public class MainActivity extends AppCompatActivity
{
	// initialize variables for the scrollView
	EditText searchInput;
	private RecyclerView resultsView;
	private RecyclerView.Adapter mAdapter;
	private RecyclerView.LayoutManager mLayoutManager;

	// run on activity launch
    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
	    super.onCreate(savedInstanceState);
	    setContentView(R.layout.activity_main);

	    // save the search input button and text input into variables for later
	    searchInput = findViewById(R.id.searchField);
	    resultsView = findViewById(R.id.resultsView);

	    // create a listener for when the search button is pressed
	    Button searchBtn = findViewById(R.id.searchBtn);
	    searchBtn.setOnClickListener(new View.OnClickListener()
	    {
		    @Override
		    public void onClick(View view)
		    {
		    	// grab the text input
	            String searchString = searchInput.getText().toString();

	            if (searchString.length() == 0)
	            {
		            Toast.makeText(MainActivity.this, "please enter a message", Toast.LENGTH_SHORT).show();
	            }
	            else
	            {
		            // save the url for http request
		            String search_url = getString(R.string.url_base) + getString(R.string.search) + searchString;
		            String response;

		            // send the search query and display the results in a scroll view
		            try
		            {
			            response = new HttpRequests().execute(search_url).get();
			            displayResults(response);
		            }
		            // display error if failed
		            catch (Exception e)
		            {
			            Toast.makeText(MainActivity.this, e.getMessage(), Toast.LENGTH_SHORT).show();
		            }

		            // closes the keyboard when the search button is pressed
		            closeKeyboard();
	            }

	        }
	    });
    }

    // takes a json array (in string form) of metaphors and adds them to a scroll view (resultsView)
    void displayResults(String results)
    {
	    try
	    {
	    	// convert json string into json object and prepares an array list for the metaphors
		    JSONObject reader = new JSONObject(results);
		    JSONArray JSONResults = reader.getJSONArray("searchResults");
		    ArrayList<MetaphorItem> metaphorList = new ArrayList<>();

		    // makes a metaphorItem for every metaphor in the json array and adds them to the metaphor arraylist
		    for(int i = 0; i < JSONResults.length(); i++)
		    {
			    JSONObject result = JSONResults.getJSONObject(i);
			    String metaphor = result.getString("text");
			    String description = result.getString("explanation");
			    String date = result.getString("time");
			    int likes = result.getInt("likeCount") - result.getInt("dislikeCount");

			    java.text.SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SS'Z'");

			    String finalDate = "";
			    try
			    {
			    	Date newDate;
				    newDate = formatter.parse(date);
				    SimpleDateFormat formatNowDay = new SimpleDateFormat("dd");
				    SimpleDateFormat formatNowMonth = new SimpleDateFormat("MM");
				    SimpleDateFormat formatNowYear = new SimpleDateFormat("YYYY");

				    String currentDay = formatNowDay.format(newDate);
				    String currentMonth = formatNowMonth.format(newDate);
				    String currentYear = formatNowYear.format(newDate);

				    finalDate = currentMonth + "/" + currentDay + "/" + currentYear;
			    } catch (ParseException e)
			    {
				    e.printStackTrace();
			    }





			    metaphorList.add(new MetaphorItem(metaphor, description, finalDate, likes));
		    }

		    // sets up the adapter to show the metaphors in the scroll view
		    resultsView = findViewById(R.id.resultsView);
		    resultsView.setHasFixedSize(true);
		    mLayoutManager = new LinearLayoutManager(this);

		    // makes the scrollView to be displayed
		    mAdapter = new MetaphorAdapter(metaphorList);

		    // displays the scrollView
		    resultsView.setLayoutManager(mLayoutManager);
		    resultsView.setAdapter(mAdapter);

	    }
	    catch (JSONException e)
	    {
		    e.printStackTrace();
	    }
    }

    // closes the keyboard if the keyboard is open
    private void closeKeyboard()
    {
    	View view = this.getCurrentFocus();
    	if (view != null)
	    {
	    	InputMethodManager imm = (InputMethodManager)getSystemService(Context.INPUT_METHOD_SERVICE);
	    	imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
	    }
    }
}


// class for sending http requests
class HttpRequests extends AsyncTask<String, Void, String>
{

	// backgound function
	@Override
	protected String doInBackground(String... urls)
	{
		return makeHttpGetRequest(urls[0]);
	}

	// takes a url in string form and returns the response from sending a get request using the url
	private static String makeHttpGetRequest(String httpAddress)
	{
		String response = "";
		InputStream inStream;

		try
		{
			// make the url connection
			URL url = new URL(httpAddress);
			HttpURLConnection urlConn = (HttpURLConnection) url.openConnection();
			urlConn.setConnectTimeout(5000);
			urlConn.setReadTimeout(2500);
			urlConn.setRequestMethod("GET");
			urlConn.setDoInput(true);

			// send the http request
			urlConn.connect();

			// save the response stream
			inStream = urlConn.getInputStream();

			// convert the response stream into a string
			Scanner scanner = new Scanner(inStream);
			while(scanner.hasNext())
			{
				response += scanner.nextLine();
			}

			// returns the string form of the response
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

		// returns error if http request fails
		return "error";
	}
}

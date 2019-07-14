package com.noble.zachary.metaphoricallyspeaking;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

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
		        Toast.makeText(MainActivity.this, "toast test", Toast.LENGTH_SHORT).show();
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
			    String pc_off = "https://maker.ifttt.com/trigger/pc_off/with/key/bGaHY_dey0UzIxiHK6MKcE";
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
		String response;
		// InputStream inStream;

		try
		{
			URL url = new URL(httpAddress);
			HttpURLConnection urlConn = (HttpURLConnection) url.openConnection();
			urlConn.setConnectTimeout(5000);
			urlConn.setReadTimeout(2500);
			urlConn.setRequestMethod("POST");
			urlConn.setDoInput(true);

			urlConn.connect();

			response = urlConn.getResponseMessage();

			// inStream = urlConn.getResponseMessage();

			// response = inStream.toString();

			return response;

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

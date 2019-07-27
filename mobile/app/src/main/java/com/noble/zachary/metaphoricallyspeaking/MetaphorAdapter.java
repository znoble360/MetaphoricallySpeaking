package com.noble.zachary.metaphoricallyspeaking;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class MetaphorAdapter extends RecyclerView.Adapter<MetaphorAdapter.MetaphorViewHolder>
{
	private ArrayList<MetaphorItem> mMetaphorList;

	// saves the ui elements to be modified
	public static class MetaphorViewHolder extends RecyclerView.ViewHolder
	{
		public TextView mMetaphorTextView;
		public TextView mDescriptionTextView;

		public MetaphorViewHolder(View itemView)
		{
			super(itemView);
			mMetaphorTextView = itemView.findViewById(R.id.metaphor);
			mDescriptionTextView = itemView.findViewById(R.id.description);
		}
	}

	// sets the metaphor list
	public MetaphorAdapter(ArrayList<MetaphorItem> MetaphorList)
	{
		mMetaphorList = MetaphorList;
	}

	// metaphorViewHolder constructor
	@Override
	public MetaphorViewHolder onCreateViewHolder(ViewGroup parent, int viewType)
	{
		View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.metaphor_item, parent, false);
		MetaphorViewHolder mvh = new MetaphorViewHolder(v);
		return mvh;
	}

	// sets the textViews for the metaphorItem
	@Override
	public void onBindViewHolder(MetaphorViewHolder holder, int position)
	{
		MetaphorItem currentItem = mMetaphorList.get(position);

		holder.mMetaphorTextView.setText(currentItem.getMetaphor());
		holder.mDescriptionTextView.setText(currentItem.getDescription());
	}

	// returns the number of metaphors in the list
	@Override
	public int getItemCount()
	{
		return mMetaphorList.size();
	}
}

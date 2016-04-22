class AnalyticsController < ApplicationController
  # GET /
  # Index page
  def index
    # Generate a unique Token and send to the view
    @token = SecureRandom.hex(16)
  end

  # DELETE /clean
  # Clean everything
  def clean
    Analytic.destroy_all
    render :json => 'ok'
  end

  # POST /analytics
  # POST /analytics.json
  def find
    # Remove de the last inserted question by this token
    last = Analytic.where('token = ?', params[:token]).last
    if last
      last.destroy;
    end

    # Create a new one, if is not empty
    if params[:title] != ''
      novo = Analytic.new(:title => params[:title], :token => params[:token])
      novo.save
    end

    #Search for similars
    @articles = Analytic.where('title like ?', params[:title]+'%').select('title').distinct
    render json: @articles
  end

  # GET /analytics
  def findPopular
    # Find Commonly Asked Questions
    @analytic = Analytic.group(:title).order('count_all desc').count
    render json: @analytic
  end
end

class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  #skip_before_action :authenticate_user!

  def save
    @user = User.find(params[:id])
    count = params[:count]
    @user.count = count
    @user.save
    respond_to do |format|
      format.js #add this at the beginning to make sure the form is populated.
    end
  end

  private 
 
  def pages_params
    params.require(:user).permit(:user_id, :count)
  end

end
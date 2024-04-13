require "net/http"

class RssController < ApplicationController
  def index
    url = "https://musicforprogramming.net/rss.xml"
    uri = URI(url)
    response = Net::HTTP.get_response(uri)

    if response.is_a?(Net::HTTPSuccess)
      xml_data = response.body

      parsed_data = Hash.from_xml(xml_data)
    else
      flash[:error] = "something fucked up"
    end
  end
end

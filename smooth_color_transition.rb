# smooth_color_transition.rb
require 'color'

# Define key colors
hex_colors = ['#FFFFE0', '#00FF00', '#FF0000', '#FFC0CB']

# Convert hex to LAB (returns a hash)
lab_colors = hex_colors.map { |hex| Color::RGB.from_html(hex).to_lab }

# Total steps
steps = 200
segments = hex_colors.length - 1
steps_per_segment = steps / segments

# Interpolation function
def interpolate_lab(start_lab, end_lab, fraction)
  l = start_lab[:L] + (end_lab[:L] - start_lab[:L]) * fraction
  a = start_lab[:a] + (end_lab[:a] - start_lab[:a]) * fraction
  b = start_lab[:b] + (end_lab[:b] - start_lab[:b]) * fraction
  Color::Lab.new(l, a, b).to_rgb.html
end

# Generate gradient
gradient = []
lab_colors.each_cons(2) do |start_lab, end_lab|
  (0...steps_per_segment).each do |i|
    fraction = i.to_f / steps_per_segment
    gradient << interpolate_lab(start_lab, end_lab, fraction)
  end
end

# Print the generated colors
puts gradient

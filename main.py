import jinja2
import pickle

category_data = pickle.load(open("category_data.pickle", "rb"))
component_group_info = pickle.load(open("component_group_info.pickle", "rb"))

def render_template(template_file_name, context, output_file_name):
    """Wrap up the Jinja2 template loading, rendering, and saving functionality."""
    # Render the template with the context
    template_loader = jinja2.FileSystemLoader(searchpath="./")
    template_env = jinja2.Environment(loader=template_loader)
    template = template_env.get_template(template_file_name)
    output_text = template.render(context)

    # Save the rendered text as a file
    with open(output_file_name, "w") as f:
        f.write(output_text)
    print("Output saved as " + output_file_name)


render_template("template.html", {
    "category_data": category_data,
    "component_group_info": component_group_info,
    }, "webpage/warframe_costs.html")

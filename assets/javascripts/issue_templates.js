// Can't use Rails' remote select because we need the form data
function updateIssueTemplateFrom(url) {
    $.ajax({
        url: url,
        type: 'put',
        data: $('#issue-template-form').serialize()
    });
}

$(document).ready(function ($) {
    $(".list_templates_projects_names").hover(function () {
        var className = $(this).attr('class').split(' ')[0]; // get first class
        $('.' + className).toggleClass("hover");
    });
});

// Template Form controller
(function () {
    stimulus_application.register("template-form", class extends Stimulus.Controller {

        static get targets() {
            return [
                "custom_form_radio_button",
                "custom_form_path_text_field",
                "custom_form",
                "standard_form",
                "split_description"
            ]
        }

        connect() {
            this.toogleForm()
        }

        reloadForm(e) {
            console.log(e.currentTarget.value)

            fetch('/issue_templates/custom_form?path=' + e.currentTarget.value)
                .then(response => response.text())
                .then(html => {
                    $('#custom_form_container')[0].innerHTML = html
                })
        }

        toogleForm() {
            if (this.custom_form_radio_buttonTarget.checked) {
                this.custom_form_path_text_fieldTarget.parentNode.style.display = 'block';
                this.custom_formTarget.style.display = 'block'
                this.standard_formTarget.style.display = 'none'
                this.split_descriptionTarget.style.display = 'none'
            } else {
                this.custom_form_path_text_fieldTarget.parentNode.style.display = 'none';
                this.custom_formTarget.style.display = 'none'
                this.standard_formTarget.style.display = 'block'
                this.split_descriptionTarget.style.display = 'block'
            }
        }

    })

    stimulus_application.register("split-description", class extends Stimulus.Controller {

        static get targets() {
            return ["split_description_checkbox", "split_description_number", "description_field"];
        }

        connect() {
            this.toggleDescriptionSectionsField();
        }

        toggleDescriptionSectionsField() {
            if (this.split_description_checkboxTarget.checked) {
                this.split_description_numberTarget.style.display = "inline-block";
                this.description_fieldTarget.style.display = "none";
            } else {
                this.split_description_numberTarget.style.display = "none";
                this.description_fieldTarget.style.display = "block";
            }
        }
    })
})();

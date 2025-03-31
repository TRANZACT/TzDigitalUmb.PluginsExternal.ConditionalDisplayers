import { customElement, html, property, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbPropertyEditorConfigCollection, UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";
import { cdDropdownFlexiblePropertyInfo } from "../manifest";
import { tagPrefix } from "../../constants";
import { UUISelectEvent } from "@umbraco-cms/backoffice/external/uui";
import { CdElement } from "../../abstractions/CdElement";
import { CdMultiValueModelDto } from "../../components/cdMultivalues";

export const elementName = `${tagPrefix}-dropdown`;

@customElement(elementName)
export class CdDropDownFlexibleElement extends CdElement {
    @property({ type: String, attribute: false })
    public value?: string;

    @property({ attribute: false })
    public set config(config: UmbPropertyEditorConfigCollection) {
        this.assignValuesFromConfig(config);
    }

    private availableValues: Array<CdMultiValueModelDto> = [];

    @state()
    private configDefaultValue?: string;

    @state()
    private configItems?: string;

    @state()
    private viewModelSelectOptions: Array<Option> = [];

    #__selectedValue: string = "";
    @state()
    public get selectedValue() {
        return this.#__selectedValue;
    }
    private set selectedValue(newValue: string) {
        if (!newValue) {
            throw new Error("value not set");
        }
        this.#__selectedValue = newValue;
        const selectedItem = this.availableValues.find(x => x.value === newValue);
        if(selectedItem) {
            this.selectedItem = selectedItem;
        }
        this.value = newValue;
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
    }

    private selectedItem?: CdMultiValueModelDto;

    protected override bootstrap() {
        this.runDisplayLogic();
    }

    protected override initDefaults() {
        if (this.value) {
            this.selectedValue = this.value;
        } else {
            this.selectedValue = this.configDefaultValue && this.isValidSelection(this.configDefaultValue)
                ? this.configDefaultValue
                : (() => {
                    console.warn("configuration is missing a valid default value");
                    return this.availableValues[0].value;
                })();
        }
    }

    protected override runDisplayLogic() {
        this.viewModelSelectOptions = this.availableValues.map((item) => {
            return <Option>{
                name: item.value,
                value: item.value,
                selected: item.value === this.selectedValue
            };
        });

        if (this.selectedItem) {
            this.displayProps(this.selectedItem.show, this.selectedItem.hide);
        }
    }

    private assignValuesFromConfig(config: UmbPropertyEditorConfigCollection) {
        this.configItems = config.getValueByAlias(cdDropdownFlexiblePropertyInfo.items.alias);
        this.configDefaultValue = config.getValueByAlias(cdDropdownFlexiblePropertyInfo.default.alias);

        // convert values
        this.availableValues = this.configItems as unknown as Array<CdMultiValueModelDto>;
    }

    private isValidSelection(value: string): boolean {
        return !!this.availableValues.find(x => x.value === value);
    }

    #onChange(event: UUISelectEvent) {
        event.stopPropagation();
        const value = event.target.value as string;
        this.selectedValue = value;
        this.runDisplayLogic();
    }

    render() {
        if (this.availableValues.length === 0) {
            return html`<p>No conditional items configured</p>`;
        }

        return html`
        <uui-select @change=${this.#onChange} required .options=${this.viewModelSelectOptions} placeholder="Pick One"></uui-select>
        `;
    }
}

export default CdDropDownFlexibleElement;

declare global {
    interface HTMLElementTagNameMap {
        [elementName]: CdDropDownFlexibleElement;
    }
}

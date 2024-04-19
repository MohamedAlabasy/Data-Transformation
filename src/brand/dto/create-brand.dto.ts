import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateBrandDto {
    @IsString()
    @IsNotEmpty({ message: 'Brand name is required' })
    readonly brandName: string;

    @Min(1600, { message: 'Year founded seems too old' })
    @Max(new Date().getFullYear(), { message: 'Year founded cannot be in the future' })
    @IsNumber()
    @IsNotEmpty({ message: 'Year founded is required' })
    readonly yearFounded: number;

    @IsString()
    @IsNotEmpty({ message: 'Headquarters location is required' })
    readonly headquarters: string;

    @Min(1, { message: 'There should be at least one location' })
    @IsNumber()
    @IsNotEmpty()
    readonly numberOfLocations: number;
}
